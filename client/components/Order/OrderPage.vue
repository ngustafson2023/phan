<template>
    <main>
        <section>
            <header>
                <h2>Ordering from {{ $store.state.orderingFrom }}</h2>
            </header>
        </section>
    </main>
</template>

<script>

export default {
  name: 'OrderPage'
};

</script>

<style scoped>

section {
  display: flex;
  flex-direction: column;
}

header, header > * {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

section .scrollbox {
  flex: 1 0 50vh;
  padding: 3%;
  overflow-y: scroll;
}

</style>