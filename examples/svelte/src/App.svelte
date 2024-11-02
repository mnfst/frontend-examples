<script>
    import { onMount } from 'svelte';
    import { router } from './router.js';
    import Manifest from "@mnfst/sdk";

    const manifest = new Manifest();

    import Header from './Header.svelte';
    import Footer from './Footer.svelte';
    import Item from './Item.svelte';

    import "./app.css";
    import "todomvc-app-css/index.css";
    import "todomvc-common/base.css";

    let currentFilter = "all";
    let items = [];

    async function fetchItems() {
        const data = await manifest.from('todos').find();
        items = data.data
    }

    async function addItem(event) {
        const newItem = await manifest.from('todos').create({
            title: event.detail.text,
            completed: false,
        });
        items.push(newItem);
        items = items;
    }

    async function removeItem(index) {
        const item = items[index];
        await manifest.from('todos').delete(item.id);
        items.splice(index, 1);
        items = items;
    }

    async function updateItem(item) {
        await manifest.from('todos').update(item.id, item);
    }

    async function toggleItem(item) {
        await manifest.from('todos').update(item.id, {
            ...item,
            completed: !item.completed,
        });
    }

    async function toggleAllItems(event) {
        items = await Promise.all(items.map(async (item) => {
            const updatedItem = await manifest.from('todos').update(item.id, {
                ...item,
                completed: true,
            });
            return updatedItem;
        }));
    }

    async function removeCompletedItems() {
        const completedItems = items.filter((item) => item.completed);
        await Promise.all(completedItems.map(item => manifest.from('todos').delete(item.id)));
        items = items.filter((item) => !item.completed);
    }
    
    onMount(async () => {
        router(route => currentFilter = route).init();
        await fetchItems();
    });

    $: filtered = currentFilter === "all" ? items : currentFilter === "completed" ? items.filter((item) => item.completed) : items.filter((item) => !item.completed);
    $: numActive = items.filter((item) => !item.completed).length;
    $: numCompleted = items.filter((item) => item.completed).length;
</script>

<Header on:addItem={addItem} />

{#if items.length > 0}
    <main class="main">
        <div class="toggle-all-container">
            <input id="toggle-all" class="toggle-all" type="checkbox" on:change={toggleAllItems} checked={numCompleted === items.length} />
            <label for="toggle-all">Mark all as complete</label>
        </div>
        <ul class="todo-list">
            {#each filtered as item, index (item.id)}
                <Item bind:item
                on:toggleItem={() => toggleItem(item)}
                 on:updateItem={() => updateItem(item)} on:removeItem={() => removeItem(index)} />
            {/each}
        </ul>

        <Footer {numActive} {currentFilter} {numCompleted} on:removeCompletedItems={removeCompletedItems} />
    </main>
{/if}
