<script>
    import { createEventDispatcher, tick } from 'svelte';

    export let item;

    const dispatch = createEventDispatcher();
    
    let editing = false;

    function removeItem() {
        dispatch('removeItem');
    }

    function startEdit() {
       editing = true;
    }

    function handleEdit(event) {
        if (event.key === "Enter")
            event.target.blur();
        else if (event.key === "Escape") 
            editing = false;
    }

    function updateItem(event) {
        if (!editing) return;
        const { value } = event.target;
        if (value.length) {
            item.title = value;
            dispatch('updateItem', item);
        } else {
          removeItem();
        }
        editing = false;
    }

    function toggleItem(item, event) {
        dispatch('toggleItem', item);
        item.completed = event.target.checked
    }

    async function focusInput(element) {
        await tick();
        element.focus();
    }
</script>

<li class:completed={item.completed} class:editing>
    <div class="view">
        <input class="toggle" type="checkbox" on:change={(event) => toggleItem(item,event)} checked={item.completed} />
        <!-- svelte-ignore a11y-label-has-associated-control -->
        <label on:dblclick={startEdit}>{item.title}</label>
        <button on:click={removeItem} class="destroy" />
    </div>

    {#if editing}
        <div class="input-container">
            <input value={item.title} id="edit-todo-input" class="edit" on:keydown={handleEdit} on:blur={updateItem} use:focusInput />
            <label class="visually-hidden" for="edit-todo-input">Edit Todo Input</label>
        </div>
    {/if}
</li>
