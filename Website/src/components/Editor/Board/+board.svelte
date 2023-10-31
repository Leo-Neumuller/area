<script lang="ts">
	import "./style.css";
	import {onMount} from "svelte";
	import {page} from "$app/stores";
	import {goto} from "$app/navigation";
	import Addbutton from "../AddButton/+addbutton.svelte";
	import NodeComponent from "../Nodes/+nodes.svelte";
	import EdgeComponent from "../Edges/+edges.svelte";
	import type Node from "./NodeInterface";
	import type Edge from "./EdgeInterface";
	import Close from "../../SVGs/+Close";
	import Modify from "../../SVGs/+Modify.svelte";
	import {createFlux, getFlux, getServices, getSubServiceMetadata, getSubServices, getOauthLink, checkConnected} from "../../../api/api";
	import {getCookie} from "../../../api/helpers";
	import Select from "../../Select/+select.svelte";
	import InputData from "../InputData/+InputData.svelte"

	import Validate from "../../SVGs/+Validate.svelte";
	import Profile from "../../SVGs/+Profile.svelte";
  	import TextInput from "../../TextInput/+TextInput.svelte";
	import { browser } from '$app/environment';
    import Warning from "../../SVGs/+Warning.svelte";
    import Icon from "../../Icon/+Icon.svelte";

	let grabbingBoard: boolean = false;
	let scale: number = 1;
	let clickedPosition: { x: number, y: number } = {x: 0, y: 0};
	let selectedNode: string | null = null;
	let selectedEdge: string | null = null;
	let nodes: Node[] = [];
	let edges: Edge[] = [];
	let newEdge: any = null;
	let insideInput: { nodeId: string, inputIndex: number, pos: { x: number, y: number } } | null = null;

	let nodeRegister: Node;
	let modifyService: boolean = false;
	let modifyServiceType: string = "";

	let modifyMenu: boolean = false;
	let newNodeMenu: boolean = false;
	let advancedModify: boolean = false;
	let saveMenu: boolean = false;
	let successCheckmark: boolean = false;
	let subServices: {"data" : { [key: string]: string }[], "nodeId" : string | undefined} = {
		"data": [{}],
		"nodeId": undefined,
	};

	let services: { [key: string]: string } = {};
	let ConnectedServices: { [key: string]: {[key: string] : boolean} } = {};
	let name: string = "Non définit";
	let descr: string = "Non définit";

	let errorMessage: string = "";

	function updateNodes() {
		nodes = [...nodes];
	}

	function handleMouseDown(e: any) {
		selectedNode = null;
		selectedEdge = null;
		modifyMenu = false;
		grabbingBoard = true;
		clickedPosition = {x: e.x, y: e.y};
	}

	function handleMouseUp(e: Event) {
		clickedPosition = {x: -1, y: -1};
		grabbingBoard = false;

		if (newEdge !== null) {
			if (insideInput !== null) {
				const startId = newEdge["nodeStartId"];
				const endId = insideInput.nodeId;

				const nodeStart = nodes.find((node) => node.id === startId);
				const nodeEnd = nodes.find((node) => node.id === endId);

				const boardWrapper = document.getElementById("boardWrapper");
				if (nodeStart && nodeEnd && boardWrapper) {
					const edgeId = `$edge_${nodeStart.id}_${newEdge.outputIndex}_${endId}_${insideInput.inputIndex}`;

					for (let i = 0; nodeStart.outputEdgeIds[i]; i++) {
						if (edgeId.slice(0, -1) === nodeStart.outputEdgeIds[i].slice(0, -1)) {
							newEdge = null;
							return;
						}
					}

					edges.forEach((edge) => {
						if (edge.outputIndex === newEdge.outputIndex && edge.nodeEndId === nodeEnd.id) {
							newEdge = null;
							return;
						}
					})
					if (nodeStart.outputEdgeIds.includes(edgeId) || nodeEnd.inputEdgeIds.includes(edgeId) || nodeStart.id === nodeEnd.id) {
						newEdge = null;
						return;
					}

					nodeStart.outputEdgeIds = [...nodeStart.outputEdgeIds, edgeId];
					nodeEnd.inputEdgeIds = [...nodeEnd.inputEdgeIds, edgeId];

					newEdge.prevStartPos = {
						x: (newEdge.currStartPos.x + boardWrapper.scrollLeft) / scale,
						y: (newEdge.currStartPos.y + boardWrapper.scrollTop) / scale,
					}

					newEdge.prevEndPos = {
						x: (insideInput.pos.x + boardWrapper.scrollLeft) / scale,
						y: (insideInput.pos.y + boardWrapper.scrollTop) / scale,
					}

					newEdge.currEndPos = {
						x: (insideInput.pos.x + boardWrapper.scrollLeft) / scale,
						y: (insideInput.pos.y + boardWrapper.scrollTop) / scale,
					}

					edges = [...edges, {
						...newEdge,
						id: edgeId,
						nodeEndId: nodeEnd.id,
						nodeEndInputIndex: insideInput.inputIndex,
					}]
					newEdge = null;
				}
			} else {
				newEdge = null;
			}
		}
	}

	function handleMouseMove(e: any) {
		if (clickedPosition.x !== -1 && clickedPosition.y !== -1) {
			let deltaX = e.x - clickedPosition.x;
			let deltaY = e.y - clickedPosition.y;

			if (selectedNode) {
				modifyMenu = false;
				const node = nodes.find((node) => node.id === selectedNode);
				if (node) {
					nodeRegister = node;
					node.currPosition = {x: (node.currPosition.x + deltaX), y: (node.currPosition.y + deltaY)};
					clickedPosition = {x: e.x, y: e.y};
					for (let i = 0; i < node.inputEdgeIds.length; i++) {
						const edge = edges.find((edge) => edge.id === node.inputEdgeIds[i]);
						if (edge) {
							edge.currEndPos = {
								x: (edge.currEndPos.x + deltaX),
								y: (edge.currEndPos.y + deltaY),
							}
						}
					}

					for (let i = 0; i < node.outputEdgeIds.length; i++) {
						const edge = edges.find((edge) => edge.id === node.outputEdgeIds[i]);
						if (edge) {
							edge.currStartPos = {
								x: (edge.currStartPos.x + deltaX),
								y: (edge.currStartPos.y + deltaY),
							}
						}
					}
					nodes = [...nodes];
					edges = [...edges];
				}
			} else {
				const boardWrapper = document.getElementById("boardWrapper");
				if (boardWrapper) {
					boardWrapper.scrollBy(-deltaX, -deltaY);
					clickedPosition = {x: e.x, y: e.y};
				}
			}
		}

		if (newEdge) {
			const boardWrapper = document.getElementById("boardWrapper");
			if (boardWrapper) {
				newEdge.currEndPos = {
					x: (e.x + boardWrapper.scrollLeft) / scale,
					y: (e.y + boardWrapper.scrollTop) / scale,
				}
			}
		}
	}


	function handleOnCLickAdd(numberInputs: number, numberOutputs: number, type: string) {
		const randomX = (window.innerWidth / 2) - 200;
		const randomY = (window.innerHeight / 2);

		let nodePrev: { x: number, y: number } = {x: randomX, y: randomY};
		let nodeCurr: { x: number, y: number } = {x: randomX, y: randomY};
		let inputs: String[] = [];
		let outputs: String[] = [];

		nodes = [
			...nodes,
			{
				id: `node_${Date.now()}-${Math.random().toString(36).substring(7)}`,
				prevPosition: nodePrev,
				currPosition: nodeCurr,
				numberInputs: numberInputs,
				numberOutputs: numberOutputs,
				type: type,
				inputEdgeIds: inputs,
				outputEdgeIds: outputs,
				title: type,
				img: "test",
			}
		];
	}

	function handleOnClickDelete() {
		const node = nodes.find((node) => node.id === selectedNode);
		if (!node) {
			selectedNode = null;
			return;
		}

		const inputs = node.inputEdgeIds;
		const outputs = node.outputEdgeIds;

		const allEdges = [...inputs, ...outputs];
		const uniqueEdges = [...new Set(allEdges)];

		for (let i = 0; i < uniqueEdges.length; i++) {
			const edgeId = uniqueEdges[i];
			const edge = edges.find((edge) => edge.id === edgeId);
			if (edge) {
				const nodeStart = nodes.find((node) => node.id === edge.nodeStartId);
				const nodeEnd = nodes.find((node) => node.id === edge.nodeEndId);
				if (nodeStart && nodeEnd) {
					nodeStart.outputEdgeIds = nodeStart.outputEdgeIds.filter((edgeId) => edgeId !== edge.id);
					nodeEnd.inputEdgeIds = nodeEnd.inputEdgeIds.filter((edgeId) => edgeId !== edge.id);
				}
				edges = edges.filter((edge) => edge.id !== edgeId);
			}
		}

		nodes = nodes.filter((node) => node.id !== selectedNode);
		selectedNode = null;
		modifyMenu = false;
	}

	function handleOnMouseDownNode(id: string, e: MouseEvent) {
		selectedEdge = null;
		selectedNode = id;
		clickedPosition = {x: e.x, y: e.y};
		const node = nodes.find((node) => node.id === id);
		if (node) {
			nodeRegister = node;
			const x = node.currPosition.x * scale;
			const y = node.currPosition.y * scale;
			node.prevPosition = {x: x, y: y};

			for (let i = 0; i < node.inputEdgeIds.length; i++) {
				const edgeId = node.inputEdgeIds[i];
				const edge = edges.find((edge) => edge.id === edgeId);
				if (edge) {
					edge.prevEndPos = {
						x: edge.currEndPos.x * scale,
						y: edge.currEndPos.y * scale,
					}
					edges = [...edges];
				}
			}

			for (let i = 0; i < node.outputEdgeIds.length; i++) {
				const edgeId = node.outputEdgeIds[i];
				const edge = edges.find((edge) => edge.id === edgeId);
				if (edge) {
					edge.prevStartPos = {
						x: edge.currStartPos.x * scale,
						y: edge.currStartPos.y * scale,
					}
					edges = [...edges];
				}
			}
		}
	}

	function handleOnMouseDownOutput(outputPositionX: number, outputPositionY: number, nodeId: string, outputIndex: number) {
		selectedNode = null;

		const boardWrapper = document.getElementById("boardWrapper");

		if (boardWrapper) {
			let prevEdgeStart: { x: number; y: number } = ({
				x: (outputPositionX + boardWrapper.scrollLeft) / scale,
				y: (outputPositionY + boardWrapper.scrollTop) / scale,
			});
			let currEdgeStart: { x: number; y: number } = ({
				x: (outputPositionX + boardWrapper.scrollLeft) / scale,
				y: (outputPositionY + boardWrapper.scrollTop) / scale,
			});
			let prevEdgeEnd: { x: number; y: number } = ({
				x: (outputPositionX + boardWrapper.scrollLeft) / scale,
				y: (outputPositionY + boardWrapper.scrollTop) / scale,
			});
			let currEdgeEnd: { x: number; y: number } = ({
				x: (outputPositionX + boardWrapper.scrollLeft) / scale,
				y: (outputPositionY + boardWrapper.scrollTop) / scale,
			});


			newEdge = {
				id: ``,
				nodeStartId: nodeId,
				outputIndex: outputIndex,
				nodeEndId: ``,
				inputIndex: -1,
				prevStartPos: prevEdgeStart,
				currStartPos: currEdgeStart,
				prevEndPos: prevEdgeEnd,
				currEndPos: currEdgeEnd,
			}
		}
	}

	function handleOnMouseEnterInput(inputPositionX: number, inputPositionY: number, nodeId: string, inputIndex: number) {
		insideInput = {
			nodeId: nodeId,
			inputIndex: inputIndex,
			pos: {
				x: inputPositionX,
				y: inputPositionY,
			}
		}
	}

	function handleOnMouseLeaveInput(nodeId: string, inputIndex: Number) {
		if (insideInput?.nodeId === nodeId && insideInput?.inputIndex === inputIndex) {
			insideInput = null;
		}
	}

	function handleOnMouseDownEdge(id: string) {
		selectedEdge = id;
	}

	function HandleOnDeleteEdge(id: string) {
		const edge = edges.find((edge) => edge.id === id);
		if (edge) {
			const nodeStart = nodes.find((node) => node.id === edge.nodeStartId);
			const nodeEnd = nodes.find((node) => node.id === edge.nodeEndId);
			if (nodeStart && nodeEnd) {
				nodeStart.outputEdgeIds = nodeStart.outputEdgeIds.filter((edgeId) => edgeId !== id);
				nodeEnd.inputEdgeIds = nodeEnd.inputEdgeIds.filter((edgeId) => edgeId !== id);
			}
			edges = edges.filter((edge) => edge.id !== id);
		}
	}

	function handleModifyNode() {
		if (nodeRegister.service != null) {
			advancedModify = true;
		} else {
			modifyService = true;
		}
		modifyMenu = false;
	}

	onMount(() => {
		setInterval(() => {
			if (!saveMenu && !advancedModify && !modifyMenu && !newNodeMenu) {
				const data =  {
					"name": name,
					"description": descr,
					"nodes": nodes,
					"edges": edges,
					"id": 0,
				};
				if ($page.url.searchParams.get("FluxId")) {
					data["id"] = Number($page.url.searchParams.get("FluxId"));
				}
				createFlux(getCookie("token"), data, true).then((res) => {
					if (res && res?.detail && res?.detail[0] && res?.detail[0]?.error) {
						errorMessage = res?.detail[0]?.error;
						return;
					}
					errorMessage = "";
					$page.url.searchParams.set("FluxId", res["id"]);
					goto(`?${$page.url.searchParams.toString()}`);
				})
			}
		}, 2000)

		const board = document.getElementById("board");
		if (board) {
			board.addEventListener("wheel", (e) => {
				scale = scale + e.deltaY * -0.0005;
				scale = Math.min(Math.max(1, scale), 2);

				board.style.transform = `scale(${scale})`;
				board.style.marginTop = `${(scale - 1) * 50}vh`;
				board.style.marginLeft = `${(scale - 1) * 50}vw`;
			});
		}
		if ($page.url.searchParams.get("FluxId")) {
			getFlux(getCookie("token"), $page.url.searchParams.get("FluxId")).then((res) => {
				name = res["name"];
				descr = res["description"];
				nodes = res["nodes"];
				edges = res["edges"];
				getServices(getCookie("token")).then((res) => {
					services = res;
					res["action"].forEach((action: any) => {
						checkConnected(getCookie("token"), action).then((res) => {
							ConnectedServices = {
								...ConnectedServices,
								'Action' : {
									...ConnectedServices['Action'],
									[action]: res["is_connected"],
								}
							};
						})
					})
					res["reaction"].forEach((reaction: any) => {
						checkConnected(getCookie("token"), reaction).then((res) => {
							ConnectedServices = {
								...ConnectedServices,
								'Reaction' : {
									...ConnectedServices['Reaction'],
									[reaction]: res["is_connected"],
								}
							};
						})
					})
				})
			})

		}
	})

	$: {
		if (modifyService && Object.entries(services).length === 0) {
			getServices(getCookie("token")).then((res) => {
				services = res;
				res["action"].forEach((action: any) => {
					checkConnected(getCookie("token"), action).then((res) => {
						ConnectedServices = {
							...ConnectedServices,
							'Action' : {
								...ConnectedServices['Action'],
								[action]: res["is_connected"],
							}
						};
					})
				})
				res["reaction"].forEach((reaction: any) => {
					checkConnected(getCookie("token"), reaction).then((res) => {
						ConnectedServices = {
							...ConnectedServices,
							'Reaction' : {
								...ConnectedServices['Reaction'],
								[reaction]: res["is_connected"],
							}
						};
					})
				})
			})
		}

		if (advancedModify && nodeRegister.service != null && (subServices["nodeId"] !== nodeRegister.id)) {
			getSubServices(getCookie("token"), nodeRegister.service, nodeRegister.type).then((res) => {
				subServices = {
					"data": res,
					"nodeId": nodeRegister.id,
				}
			})
		}


		if (advancedModify && nodeRegister.subServiceId !== undefined &&
			(nodeRegister.inputsData === undefined || nodeRegister.inputDataFromSubServiceId !== nodeRegister.subServiceId)) {
			getSubServiceMetadata(getCookie("token"), nodeRegister.subServiceId).then((res) => {
				nodeRegister.inputDataFromSubServiceId = nodeRegister.subServiceId;
				nodeRegister.inputsData = res["inputsData"];
			})
		}
	}

	
	function getSubeserviceid() {
		let parentNode = nodes.find((nodes) => nodes.id === nodeRegister.inputEdgeIds[0]?.slice(6, 30))
		console.log(nodeRegister.inputEdgeIds[0]?.slice(6, 30), nodes, parentNode)
		return parentNode?.subServiceId;
	}

</script>

<div>
	{#if errorMessage !== ""}
		<div class="group absolute top-[13%] left-4 w-16 h-16 bg-gray rounded-lg flex items-center hover:w-[18rem] z-[100] pl-2 ease-in-out duration-500">
			<Warning className="w-12 h-12" color="#d1c71a"/>
			<h1 class="opacity-0 group-hover:opacity-100 ease-in-out duration-700 text-[#d1c71a] text-lg font-SpaceGrotesk absolute top-[6%] left-16 w-[13rem]">
				{errorMessage}
			</h1>
		</div>
	{/if}
	<div class={`${saveMenu ? "flex" : "hidden"} gap-3 rounded-xl flex-col absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] z-[30] bg-gray border border-black p-6`}>
		<div class={`${successCheckmark ? "flex" : "hidden"}  flex-col`}>
			<button on:click={() => {
				saveMenu = false;
			}}>
				<Close className="w-4 h-4" color="#F3F3F3"/>
			</button>
			<div class="px-12 pr-14">
				<div class="success-checkmark">
					<div class="check-icon">
						<span class="icon-line line-tip"></span>
						<span class="icon-line line-long"></span>
						<div class="icon-circle"></div>
						<div class="icon-fix"></div>
					</div>
				</div>
			</div>
			</div>
		<div class={`${successCheckmark ? "hidden" : "flex"} flex-col gap-3`}>			
			<div class="flex justify-between items-center align-middle">
				<button on:click={() => {
					saveMenu = false;
				}}>
					<Close className="w-4 h-4" color="#F3F3F3"/>
				</button>
			</div>
			<TextInput label="Nom du flux" type="text" placeholder="Nom du flux" value={name} deactivated={false}
				onInput={(e) => {
					name = e.target.value;
				}}/>
			<TextInput label="Description du flux" type="text" placeholder="Description du flux" value={descr} deactivated={false}
				onInput={(e) => {
					descr = e.target.value;
				}}/>
			<button class="text-customWhite rounded border border-customWhite mt-2" on:click={() => {
				const data =  {
					"name": name,
					"description": descr,
					"nodes": nodes,
					"edges": edges,
					"id": 0,
				};
				if ($page.url.searchParams.get("FluxId")) {
					data["id"] = Number($page.url.searchParams.get("FluxId"));
				}
				createFlux(getCookie("token"), data, true).then((res) => {
					$page.url.searchParams.set("FluxId", res["id"]);
					goto(`?${$page.url.searchParams.toString()}`);
					successCheckmark = true;
				})
			}}>
				Sauvergarder le flux
			</button>
		</div>

	</div>
  <button class={`absolute top-7 right-24 px-4 py-1 rounded z-40 text-[1.7rem] font-SpaceGrotesk  
  				  font-bold border
				  ${errorMessage !== "" ? "border-customWhite/50 text-customWhite/50" : "border-customWhite text-customWhite hover:text-gray hover:bg-customWhite"}`}
		on:click={() => {
			successCheckmark = false;
			saveMenu = !saveMenu;
		}} disabled={errorMessage !== "" ? true : false}>
	Sauvegarder
  </button>
  <div class="">
	<Addbutton showDelete={selectedNode === null} onCLickAdd={handleOnCLickAdd} onClickDelete={handleOnClickDelete} bind:open={newNodeMenu}/>
  </div>
  <div
	class={`${modifyService ? "flex" : "hidden"} flex-col bg-gray rounded-[20px] absolute w-[60%] h-[80%] top-[60%] left-[50%] -translate-x-[50%] -translate-y-[55%] z-[21] p-10`}>
	<div class="flex w-full justify-between items-center">
		<div class="text-[3.125rem] font-medium text-customWhite">
			{nodeRegister?.type}
		</div>
		<button on:click={() => {
					modifyService = false;
				}}>
			<Close className="w-8 h-8" color="#F3F3F3"/>
		</button>
	</div>
	<div class="flex flex-wrap gap-4 pt-4">
		{#if Object.entries(services).length !== 0 && nodeRegister != null}
			{#each services[nodeRegister.type.toLowerCase()] as service}
				<button on:click={() => {
							modifyService = false;
							advancedModify = true
							nodeRegister.service = service;
							nodeRegister.title = service;
							updateNodes();
						}} class="text-customWhite bg-customWhite/10 p-4 rounded-xl text-[1.7rem] font-SpaceGrotesk flex justify-between gap-4 items-center">
					<Icon name={service} className="w-8 h-8"/>
					{service}
				</button>
			{/each}
		{/if}
	</div>
  </div>
  {#if (advancedModify)}
	<div class="fixed top-26 right-0 w-screen md:w-[34rem] h-screen z-[100] bg-gray px-6 py-2">
		<button class="absolute"
			on:click={() => {
				advancedModify = false;
			}}>
			<Close className="w-6 h-6" color="#F3F3F3"/>
		</button>
		<h1 class="text-[2.2rem] font-SpaceGrotesk text-customWhite font-semibold w-full text-center">
			{nodeRegister.service}
		</h1>
		<div class="pt-14 h-[80%] overflow-auto px-2">
			<div class="flex flex-col gap-16 justify-between h-full">
				<div class="flex flex-col gap-6">
					<div class="flex flex-col gap-6">
						<h1 class="text-[2.2rem] font-SpaceGrotesk text-customWhite font-semibold">
							Application
						</h1>
						<div class={`flex font-SpaceGrotesk w-full bg-customWhite/[10%] font-medium text-[1.75rem] p-4 align-middle items-center justify-between rounded-[0.63rem]`}>
							<Icon name={nodeRegister.service} className="w-8 h-8"/>
							<h1 class="text-customWhite">{nodeRegister.service}</h1>
							<button class="bg-primary rounded-lg p-1 px-2" on:click={() => {
								advancedModify = false;
								modifyService = true;
							}}>
								<p class="text-gray">modifier</p>
							</button>
						</div>
					</div>
					<div>
						<h1 class="text-[2.2rem] font-SpaceGrotesk text-customWhite font-semibold">
							{nodeRegister.type}
						</h1>
						<div class="">
							<Select options={subServices["data"].map((subService) => subService["name"])}
								value={subServices["data"].find((subService) => nodeRegister.subServiceId === subService["id"])?.name}
								placeholder="Choisissez une action à éxecuter"
								onChange={(value) => {
									nodeRegister.subService = value
									nodeRegister.subServiceId =  subServices["data"].find((subService) => subService["name"] === value)?.id
								}}/>
							<div>
								{#if nodeRegister?.inputsData}
									{#each nodeRegister.inputsData as inputData}
										<InputData bind:inputD={inputData} nodeType={getSubeserviceid()} service={nodeRegister.type}/>
									{/each}
								{/if}
							</div>
						</div>
					</div>
				</div>

				<div class="">
					<div class={`${nodeRegister.service && ConnectedServices[nodeRegister.type][nodeRegister.service] ? "flex" : "hidden"} gap-6 font-SpaceGrotesk w-full bg-customWhite/[10%] font-medium text-[1.75rem] p-4 align-middle items-center justify-center rounded-[0.63rem]`}>
						<h1 class="text-customWhite">Connecté</h1>
						<Validate className="w-8 h-8" color="#D9C6F4"/>
					</div>
					<button class={`${nodeRegister.service && ConnectedServices[nodeRegister.type][nodeRegister.service] ? "hidden" : "flex"} gap-6 font-SpaceGrotesk w-full bg-customWhite/[10%] font-medium text-[1.75rem] p-4 align-middle items-center justify-center rounded-[0.63rem]`}
					on:click={() => {
						if (nodeRegister?.service) {
							getOauthLink(getCookie("token"), nodeRegister.service).then((res) => {
								const popup = window.open(res["url"], "popup", "width=600,height=600 popup=true");
								const interval = setInterval(() => {
									try {
										if (popup?.window?.location.href) {
											popup?.close();
											clearInterval(interval);
											ConnectedServices = {
												...ConnectedServices,
												"Action": {
													...ConnectedServices["Action"],
													[nodeRegister.service]: true,
												},
												"Reaction": {
													...ConnectedServices["Reaction"],
													[nodeRegister.service]: true,
												},
											};
										}
									} catch {
										return;
									}
								}, 1000);
							});
						}
					}}>
						<h1 class="text-customWhite">Se connecter</h1>
						<Profile className="w-8 h-8" color="#F3F3F3"/>
					</button>
				</div>
			</div>
		</div>
	</div>

  {/if}
  {#if (modifyMenu)}
	<div style="transform: translate(
			{nodeRegister.currPosition.x}px,
			{nodeRegister.currPosition.y}px)"
		 class={`rounded-[20px] cursor-pointer flex flex-col ${nodeRegister.type === "Action" ? "bg-gray text-customWhite" : "bg-primary text-gray"} box-border absolute left-[430px] -top-[8px] z-[20] w-[14rem] font-SpaceGrotesk p-5 gap-2`}>
	  <div class="flex w-full justify-between align-middle items-center">
		<button on:click={handleModifyNode} class="text-[1.4rem] font-medium flex justify-between w-full">
		  Modifier
		  <Modify className="w-7 h-7" color={nodeRegister.type === "Action" ? "#F3F3F3" : "#373637"}/>
		</button>
	  </div>
	  <div class="flex w-full justify-between align-middle items-center font-medium">
		<button on:click={handleOnClickDelete} class="text-[1.4rem] flex justify-between w-full">
		  Supprimer
		  <Close className="w-6 h-6" color={nodeRegister.type === "Action" ? "#F3F3F3" : "#373637"}/>
		</button>
	  </div>
	</div>
  {/if}
  <div id="boardWrapper" class="fixed w-screen h-screen top-0 left-0 overflow-scroll">
	<div class={`${grabbingBoard ? "boardDragging" : "board"}`} role="presentation" id="board"
			on:mousedown={(e) => {handleMouseDown(e)}}
			on:mouseup={(e) => {handleMouseUp(e)}}
			on:mousemove={(e) => {handleMouseMove(e)}}>
	  {#each nodes as node}
		<NodeComponent
			id={node.id}
			type={node.type}
			pos={node.currPosition}
			numberOfInputs={node.numberInputs}
			numberOfOutputs={node.numberOutputs}
			selected={node.id === selectedNode}
			bind:modify={modifyMenu}
			title={node.title}
			onMouseDownNode={handleOnMouseDownNode}
			onMouseDownOutput={handleOnMouseDownOutput}
			onMouseEnterInput={handleOnMouseEnterInput}
			onMouseLeaveInput={handleOnMouseLeaveInput}/>
	  {/each}
	  {#if (newEdge)}
		<EdgeComponent
		  selected={false}
		  isNew={true}
		  position={{
						x0: newEdge.currStartPos.x,
						y0: newEdge.currStartPos.y,
						x1: newEdge.currEndPos.x,
						y1: newEdge.currEndPos.y
					}}
		  onMouseDownEdge={() => {}}
		  onClickDeleteEdge={() => {}}/>
	  {/if}
	  {#each edges as edge}
		<EdgeComponent
		  selected={selectedEdge === edge.id}
		  isNew={false}
		  position={{
						x0: edge.currStartPos.x,
						y0: edge.currStartPos.y,
						x1: edge.currEndPos.x,
						y1: edge.currEndPos.y
					}}
		  onMouseDownEdge={() => {handleOnMouseDownEdge(edge.id)}}
		  onClickDeleteEdge={() => {HandleOnDeleteEdge(edge.id)}}/>
	  {/each}
	</div>
  </div>
</div>


<!-- 
for (let i = 0; i < services.length; i++) {
	const service = services[i];
	const randomX = Math.random() * (window.innerWidth - 300) + 300;
	const randomY = Math.random() * (window.innerHeight - 300) + 300;

	let nodePrev: {x: number, y: number} = {x: randomX, y: randomY};
	let nodeCurr: {x: number, y: number} = {x: randomX, y: randomY};
	let inputs: String[] = [];
	let outputs: String[] = [];

	nodes = [
		...nodes,
		{
			id: `node_${Math.random().toString(36).substring(7)}`,
			prevPosition: nodePrev,
			currPosition: nodeCurr,
			numberInputs: service.inputs.length,
			numberOutputs: service.outputs.length,
			type: "Service",
			inputEdgeIds: inputs,
			outputEdgeIds: outputs,
			title: service.name,
			img: "test",
		}
	];
} -->

<style>
	/* width */
	::-webkit-scrollbar {
	  width: 6px;
	}
	
	/* Track */
	::-webkit-scrollbar-track {
	  background: #f1f1f1; 
	}
	 
	/* Handle */
	::-webkit-scrollbar-thumb {
	  background: #888; 
	}
	
	/* Handle on hover */
	::-webkit-scrollbar-thumb:hover {
	  background: #555; 
	}
	</style>