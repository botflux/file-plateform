<template>
    <div class="d-flex flex-column mt-5">
        <h3 class="mb-3">Définition des attributs de l'élément global</h3>
        <button class="btn btn-success mr-auto mb-4" @click="addAttribute()">Ajouter un attribut</button>
        <div class="py-3 border-bottom border-top" v-for="(attribute, i) in $v.attributes.$each.$iter" :key="`attribute-${i}`">
            <xml-attribute :attribute="attribute" :attributeId="Number.parseInt(i)" />
            <button class="btn btn-danger" @click="removeAttribute(attribute.$model)">Supprimer</button>
        </div>
    </div>
</template>

<script>
import XMLAttribute from '@/components/XMLAttribute'
import { createNamespacedHelpers } from 'vuex'
import * as types from '@/stores/types.js'
import { required } from 'vuelidate/lib/validators'
const { mapState, mapActions } = createNamespacedHelpers('csvToXml')
export default {
    components: {
        'xml-attribute': XMLAttribute,
    },
    computed: {
        ...mapState({
            attributes: state => state.attributes
        })
    },
    methods: {
        addAttribute () {
            this[types.SET_CSV_TO_XML_ATTRIBUTES] ([
                ...this.attributes, {
                    name: '',
                    value: ''
                }
            ])
        },
        removeAttribute (attribute) {
            this[types.SET_CSV_TO_XML_ATTRIBUTES] (this.attributes.filter(a => a == attribute))
            // this.attributes = this.attributes.filter ((a, i) => i != index)
        },
        ...mapActions([
            types.SET_CSV_TO_XML_ATTRIBUTES,
        ])
    },
    validations: {
        attributes: {
            $each: {
                name: {
                    required
                }
            }
        }
    },
    watch: {
        attributes: {
            handler (v) {
                this[types.SET_CSV_TO_XML_ATTRIBUTES] (v)
            },
            deep: true
        }
    }
}
</script>

