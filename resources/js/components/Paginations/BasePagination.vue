<template>
    <div class="pagination">
        <ol>
            <li v-for="n in this.pagesNumber">
                <button v-on:click="$emit('changePage', n)">{{ n }}</button>
            </li>
        </ol>
    </div>
</template>

<script>
    export default {
        props: ['currentPageData', 'pagesNumber'],
        data: function() {
            return {
                currentPage: 1,
            };
        },
        beforeMount: function() {
            this.currentPage = parseInt(this.currentPageData);
        },
    }
</script>










