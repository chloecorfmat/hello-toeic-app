<template>
    <div class="pagination paginationv2">

        <!-- Full pagination -->
        <ol v-if="pagination.type === 'full'">
            <li v-for="n in this.pagesNumber">
                <button v-if="pagination.current !== n" v-on:click="$emit('changePage', n)">{{ n }}</button>
                <span v-else>{{ n }}</span>
            </li>
        </ol>


        <!-- Partial pagination -->
        <ol v-else>
            <li v-if="pagination.current !== 1">
                <button v-on:click="$emit('changePage', 1)">
                    <i class="fas fa-step-backward"></i>
                </button>
            </li>
            <li v-if="pagination.current !== 1">
                <button v-on:click="$emit('changePage', pagination.current-1)">
                    <i class="fas fa-chevron-left"></i>
                </button>
            </li>

            <li>
                <button v-if="pagination.current !== 1" v-on:click="$emit('changePage', 1)">1</button>
                <span v-else>1</span>
            </li>
            <li v-show="pagination.second">
                <button v-if="pagination.current !== 2" v-on:click="$emit('changePage', 2)">2</button>
                <span v-else>2</span>
            </li>
            <li v-if="pagination.current == 2 && pagination.second">
                <button v-on:click="$emit('changePage', 3)">3</button>
            </li>

            <li v-show="pagination.hiddenFirst">
                <i class="fas fa-ellipsis-h"></i>
            </li>

            <li v-show="pagination.hiddenCentered">
                <i class="fas fa-ellipsis-h"></i>
            </li>

            <li v-show="pagination.middle">
                <button v-on:click="$emit('changePage', pagination.current-1)">{{ pagination.current-1 }}</button>
            </li>
            <li v-show="pagination.middle">
                <span>{{ pagination.current }}</span>
            </li>
            <li v-show="pagination.middle">
                <button v-on:click="$emit('changePage', pagination.current+1)">{{ pagination.current+1 }}</button>
            </li>

            <li v-show="pagination.hiddenSecond">
                <i class="fas fa-ellipsis-h"></i>
            </li>

            <li v-if="pagination.current == pagination.last-1 && pagination.beforeLast">
                <button v-on:click="$emit('changePage', pagination.last-2)">{{ pagination.last-2 }}</button>
            </li>
            <li v-show="pagination.beforeLast">
                <button v-if="pagination.current !== pagination.last - 1" v-on:click="$emit('changePage', pagination.last - 1)">{{ pagination.last - 1 }}</button>
                <span v-else>{{ pagination.last - 1 }}</span>
            </li>

            <li>
                <button v-if="pagination.current !== pagination.last" v-on:click="$emit('changePage', pagination.last)">{{ pagination.last }}</button>
                <span v-else>{{ pagination.last }}</span>
            </li>

            <li v-if="pagination.current !== pagination.last">
                <button v-on:click="$emit('changePage', pagination.current+1)">
                    <i class="fas fa-chevron-right"></i>
                </button>
            </li>
            <li v-if="pagination.current !== pagination.last">
                <button v-on:click="$emit('changePage', pagination.last)">
                    <i class="fas fa-step-forward"></i>
                </button>
            </li>
        </ol>

        <div>
            {{ currentPage }} of {{ pagesNumber }}
        </div>
    </div>
</template>

<script>
    export default {
        props: ['currentPage', 'pagesNumber'],
        computed: {
            pagination: function () {
                let paginationObject = {};

                paginationObject.first = 1;
                paginationObject.last = this.pagesNumber;
                paginationObject.current = this.currentPage;

                if (this.pagesNumber < 6) {
                    paginationObject.type = 'full';
                    paginationObject.second = false;
                    paginationObject.beforeLast = false;
                    paginationObject.hiddenFirst = false;
                    paginationObject.hiddenSecond = false;
                    paginationObject.hiddenCentered = false;
                    paginationObject.middle = false;
                } else if (this.currentPage < 3 || this.currentPage > this.pagesNumber-2) {
                    paginationObject.type = 'partial';
                    paginationObject.second = true;
                    paginationObject.beforeLast = true;
                    paginationObject.hiddenFirst = false;
                    paginationObject.hiddenSecond = false;
                    paginationObject.hiddenCentered = true;
                    paginationObject.middle = false;
                } else {
                    paginationObject.type = 'partial';
                    paginationObject.hiddenFirst = true;
                    paginationObject.hiddenSecond = true;

                    if (this.currentPage == 3) { // 3 = 1 + 2
                        paginationObject.hiddenFirst = false;
                    }


                    if (this.currentPage == this.pagesNumber-2) {
                        paginationObject.hiddenSecond = false;
                    }

                    paginationObject.second = false;
                    paginationObject.beforeLast = false;
                    paginationObject.hiddenCentered = false;
                    paginationObject.middle = true;
                }

                return paginationObject;
            },
        },
    }
</script>










