<template>
    <div class="container">
        <div class="row mb-5">
            <router-link :to="{ name: 'csv-to-xml-root' }" class="btn btn-primary">Suivant</router-link>
        </div>
        <div class="row mb-4">
            <label>Liste des en-têtes détéctées dans le fichier</label>
        </div>
        <file-header-container>
            <file-header v-for="(header, i) in headers" :key="`header${i}`" :header="header" />
        </file-header-container>
        <div class="row mb-4">
            <div class="col-md-12">
                <button class="btn btn-success" @click="addField({ field: createNewField() })">Ajouter un nouveau champs</button>
            </div>
        </div>

        <div class="row border-bottom pb-2 pt-4" v-for="field in fields" :key="field.id">
            <div class="col-md-10 mb-3 d-flex flex-column">
                <label>Nom du champs</label>
                <div class="mb-3">
                    <input type="text" class="form-control" :value="field.name" @input="updateMessage($event, field.id)">
                </div>
                <label>De quelle(s) colonne(s) sera construit ce champs ?</label>
                <div class="d-flex mb-3">
                    <div class="custom-control custom-checkbox mr-4" v-for="header in headers" :key="header">
                        <input type="checkbox" :checked="field.columns.includes(header)" class="custom-control-input" :value="header" :id="`csv-to-xml-map-${header}-${field.id}`" @change="updateColumns($event, field.id)">
                        <label :for="`csv-to-xml-map-${header}-${field.id}`" class="custom-control-label">{{ header }}</label>
                    </div>
                </div>
                <label v-if="field.columns.length > 1">Avec quel caractère souhaitez vous rassembler les colonnes ?</label>
                <div class="d-flex" v-if="field.columns.length > 1">
                    <input type="text" class="form-control">
                </div>
            </div>
            <div class="col-md-2">
                <button class="btn btn-danger ml-2" @click="removeField({ field })">Supprimer</button>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
    /* eslint-disable */
import { ADD_FIELD, REMOVE_FIELD, UPDATE_FIELD } from '@/store/csv-to-xml'
import FileHeader from '@/components/FileHeader'
import FileHeaderContainer from '@/components/FileHeaderContainer'

export default {
    components: {
        FileHeaderContainer, FileHeader
    },
    computed: {
        ...mapState('csvToXml', {
            fields: state => state.fields,
            headers: state => state.headers
        }),
    },
    methods: {
        ...mapActions('csvToXml', [
            ADD_FIELD,
            REMOVE_FIELD,
            UPDATE_FIELD
        ]),
        ...{
            createNewField () {
                return {
                    name: '',
                    columns: []
                }
            },
            updateMessage (event, id) {
                const field = this.fields.find(f => f.id == id)
                field.name = event.target.value
                
                this.$store.dispatch('csvToXml/'+UPDATE_FIELD, {field})
            },
            updateColumns (event, id) {
                console.log(event.target, id)
                
                const field = this.fields.find(f => f.id == id)

                if (event.target.checked) {
                    // ajouter
                    field.columns = [...field.columns, ...[event.target.value]]
                } else {
                    field.columns = [
                        ...field.columns.filter(c => c != event.target.value)
                    ]
                }

                this.$store.dispatch('csvToXml/'+UPDATE_FIELD, {field})
            },
        }
    },
    beforeRouteLeave (to, from, next) {
        if (to.name.includes ('csv-to-xml-')) {
            const fieldsAreValid = this.fields.reduce ((prev, cur) => {
                if (cur.name !== '' && cur.columns.length !== 0) {
                    return true
                }
                
                return prev
            }, false)

            if (fieldsAreValid) {
                next()
            }
        } else {
            next()
        }        
    }
}
</script>

