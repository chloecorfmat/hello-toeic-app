<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card card-default">
                    <div class="card-header">Example Component</div>

                    <div class="card-body">
                        Hello {{ datas.name }} !
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['datas'],
        mounted() {
            console.log('Component mounted.');
            console.dir(this.datas)
        }
    }
</script>
