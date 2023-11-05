<script lang="ts">
    import "./style.css";
    export let selected: boolean;
    export let isNew: boolean;
    export let position: {x0: number, y0: number, x1: number, y1: number};
    export let onMouseDownEdge: () => void;
    export let onClickDeleteEdge: () => void;

    let middlePoint = () => {
        return {
            x: position.x0 + (position.x1 - position.x0) / 2,
            y: position.y0 + (position.y1 - position.y0) / 2
        }
    }

    function handleOnMouseDown(e: any) {
        e.stopPropagation();
        onMouseDownEdge();
    }

    function handleOnClickDelete(e: any) {
        e.stopPropagation();
        onClickDeleteEdge();
    }
</script>

<svg class="wrapper">
    <path role="presentation" class={`${isNew ? "edgeNew" : selected ? "edgeSelected" : "edge"}`}
        d={`M ${position.x0} ${position.y0} 
            C ${position.x1 - (Math.abs(position.x1 - position.x1) / 2)} ${position.y0}, 
              ${position.x0 + (Math.abs(position.x1 - position.x1) / 2)} ${position.y1}, 
              ${position.x1} ${position.y1}`} on:mousedown={handleOnMouseDown}>
        
    </path>
    <g role="presentation" 
        class={`${selected ? "delete" : "deleteHidden"}`} on:mousedown={handleOnClickDelete}
        transform={`translate(${middlePoint().x}, ${middlePoint().y - (selected ? 24 : 0)})`}>
        <circle class="circle"></circle>
        <svg
        fill="currentColor"
        stroke-width="0"
        width="30"
        height="30"
        viewBox="210 240 1000 1000"
        style="overflow: visible;"
        class="icon"
        >
        <path d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0h120.4c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64s14.3-32 32-32h96l7.2-14.3zM32 128h384v320c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16v224c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16v224c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16v224c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z"></path>
    </svg>
    </g>
</svg>