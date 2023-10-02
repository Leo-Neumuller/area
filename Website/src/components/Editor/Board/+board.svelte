<script lang="ts">
    import "./style.css";
    import { onMount } from "svelte";
    import Addbutton from "../AddButton/+addbutton.svelte";
    import NodeComponent from "../Nodes/+nodes.svelte";
    import EdgeComponent from "../Edges/+edges.svelte";
    import type Node from "./NodeInterface";
    import type Edge from "./EdgeInterface";
    import Edges from "../Edges/+edges.svelte";

    let grabbingBoard: boolean = false;
    let scale: number = 1;
    let clickedPosition: {x: number, y: number} = {x: 0, y: 0};
    let selectedNode: string | null = null;
    let selectedEdge: string | null = null;
    let nodes: Node[] = [];
    let edges: Edge[] = [];
    let newEdge: any = null;
    let insideInput: {nodeId: string, inputIndex: number, pos: {x: number, y: number}} | null = null;

    function handleMouseDown(e: any) {
        selectedNode = null;
        selectedEdge = null;
        
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
                    if (nodeStart.outputEdgeIds.includes(edgeId) || nodeEnd.inputEdgeIds.includes(edgeId)) {
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
                const node = nodes.find((node) => node.id === selectedNode);
                if (node) {
                    node.currPosition = {x: (node.currPosition.x + deltaX) * scale, y: (node.currPosition.y + deltaY) * scale};
                    clickedPosition = {x: e.x, y: e.y};
                    for (let i = 0; i < node.inputEdgeIds.length; i++) {
                        const edge = edges.find((edge) => edge.id === node.inputEdgeIds[i]);
                        if (edge) {
                            edge.currEndPos = {
                                x: (edge.currEndPos.x + deltaX) * scale,
                                y: (edge.currEndPos.y + deltaY) * scale,
                            }
                        }
                    }

                    for (let i = 0; i < node.outputEdgeIds.length; i++) {
                        const edge = edges.find((edge) => edge.id === node.outputEdgeIds[i]);
                        if (edge) {
                            edge.currStartPos = {
                                x: (edge.currStartPos.x + deltaX) * scale,
                                y: (edge.currStartPos.y + deltaY) * scale,
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
                numberInputs: numberInputs,
                numberOutputs: numberOutputs,
                type: type,
                inputEdgeIds: inputs,
                outputEdgeIds: outputs
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
    }

    function handleOnMouseDownNode(id: string, e: MouseEvent) {
        selectedEdge = null;
        selectedNode = id;
        clickedPosition = {x: e.x, y: e.y};
        const node = nodes.find((node) => node.id === id);
        if (node) {
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
            console.log(edges);
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

    onMount(() => {
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
    })
</script>
  
<div id="boardWrapper" class="fixed w-screen h-screen top-0 left-0 overflow-scroll">
    <Addbutton showDelete={selectedNode === null} onCLickAdd={handleOnCLickAdd} onClickDelete={handleOnClickDelete} />
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
                onMouseDownNode={handleOnMouseDownNode} 
                onMouseDownOutput={handleOnMouseDownOutput}
                onMouseEnterInput={handleOnMouseEnterInput} 
                onMouseLeaveInput={handleOnMouseLeaveInput} />
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
                onClickDeleteEdge={() => {}} />
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
                onClickDeleteEdge={() => {HandleOnDeleteEdge(edge.id)}} />
        {/each}
    </div>
</div>
