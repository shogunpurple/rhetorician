<script>
    export let listening;
</script>

<style>
    button {
        border-radius: 100%;
        width: 80px;
        height: 80px;
        color: white;
        transition: 0.2s all ease-in;
        cursor: pointer;
        background: #8e2de2;
        background: -webkit-linear-gradient(to right, #4a00e0, #8e2de2);
        background: linear-gradient(to right, #4a00e0, #8e2de2);
        box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.7);
        display: flex;
        justify-content: center;
        align-items: center;
    }

    button:hover {
        transform: scale(1.05);
    }

    button.listening {
        animation: pulse 2s infinite;
    }

    @keyframes pulse {
        0% {
            transform: scale(0.95);
            box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.7);
        }

        70% {
            transform: scale(1);
            box-shadow: 0 0 0 10px rgba(0, 0, 0, 0);
        }

        100% {
            transform: scale(0.95);
            box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
        }
    }
</style>

<button on:click class:listening>
    <slot />
</button>
