<template>
    <div class="jumbotron py-4">
        <div>{{declarationTag|surround}}</div>
        <div>{{ globalOpeningTag | surround }}</div>
        <div class="ml-3">{{ collectionTag | surround }}</div>
        <div class="ml-5" v-for="(mapField, i) in fields" :key="`preview-${i}`">{{ mapField.name | surround }}{{ mapField.columns.length == 0 ? mapField.value : mapField.columns.join(' + ') }}{{ mapField.name | addSlash | surround }}</div>
        <div class="ml-3">{{ collectionTag | addSlash | surround }}</div>
        <div>{{ globalTag | addSlash | surround }}</div>
    </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapState } = createNamespacedHelpers('csvToXml')

export default {
    computed: {
        ...mapState({
            globalTag: state => state.globalTag,
            collectionTag: state => state.collectionTag,
            fields: state => state.fields,
            declarations: state => state.declarations,
            attributes: state => state.attributes
        }),
        
        globalOpeningTag () {
            const attrString = this.attributes.reduce((prev, cur) => {
                return `${prev} ${cur.name}="${cur.value}"`
            }, '')

            return this.globalTag + attrString
        },
        declarationTag () {
            const declarationString = this.declarations.reduce((prev, cur) => {
                return `${prev} ${cur.name}="${cur.value}"`
            }, '')

            return `?xml ${declarationString}?`
        },
    },
    filters: {
        surround (value) {
            if (!value) return ''
            return `<${value}>`
        },
        addSlash (value) {
            if (!value) return ''
            return `/${value}`
        }
    },
}
</script>
