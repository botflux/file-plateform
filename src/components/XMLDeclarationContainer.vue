<template>
    <div class="d-flex flex-column mt-5">
        <h3 class="mb-3">Définition des déclarations du fichier XML</h3>
        <button class="btn btn-success mr-auto mb-3" @click="addDeclaration()">Ajouter une déclaration</button>
        <div class="py-3 border-bottom border-top" v-for="(declaration, i) in $v.declarations.$each.$iter" :key="`declaration-${i}`">
            <xml-declaration :declaration="declaration" :declarationId="Number.parseInt(i)" />
            <button class="btn btn-danger" @click="removeDeclaration(declaration.$model)">Supprimer</button>
        </div>
    </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import * as types from '@/stores/types'
import XMLDeclaration from '@/components/XMLDeclaration'
import { required } from 'vuelidate/lib/validators'

const { mapState, mapActions } = createNamespacedHelpers('csvToXml')
export default {
    mounted () {
        console.log('hello')
        console.log(this.declarations)
    },
    components: {
        'xml-declaration': XMLDeclaration
    },
    computed: {
        ...mapState({
            declarations: state => state.declarations
        })
    },
    methods: {
        addDeclaration () {
            this[types.SET_CSV_TO_XML_DECLARATIONS] ([
                ...this.declarations, {
                    name: '',
                    value: '',
                }
            ])
        },
        removeDeclaration (declaration) {
            this[types.SET_CSV_TO_XML_DECLARATIONS] ([
                ...this.declarations.filter(d => d != declaration)
            ])

            // this.declarations = this.declarations.filter ((d, i) => i != index)
        },
        ...mapActions([
            types.SET_CSV_TO_XML_DECLARATIONS
        ])
    },

    //validation
    validations: {
        declarations: {
            $each: {
                name: {
                    required
                }
            }
        }
    },
    watch: {
        declarations: {
            handler (v) {
                this[types.SET_CSV_TO_XML_DECLARATIONS] (v)
            },
            deep: true
        }
    }
}
</script>

