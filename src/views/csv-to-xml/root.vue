<template>
    <div class="container">
        <div class="row mb-5">

        </div>
        <div class="row mb-3">
            <h2>Information du XML</h2>
        </div>
        <div class="row d-flex flex-column mb-5">
            <div class="form-group">
                <label>Comment se nommera l'élément englobant la collection ?</label>
                <input type="text" class="form-control">
            </div>
            <div class="form-group">
                <label>Comment se nommera l'élément englobant une entité ?</label>
                <input type="text" class="form-control">
            </div>
        </div>
        <div class="row mb-3">
            <h2>Les attributs de l'élément englobant la collection</h2>
        </div>
        <div class="row">
            <button class="btn btn-success" @click="addXmlAttribute(createAttribute())">Ajouter un attribute</button>
        </div>
        <div class="row pb-2 pt-4 mb-5 border-bottom" v-for="attribute in attributes" :key="attribute.id">
            <div class="form-group col-md-5">
                <label>Nom</label>
                <input type="text" :value="attribute.name" class="form-control" @input="changeName($event, attribute.id)">
            </div>
            <div class="form-group col-md-5">
                <label>Valeur</label>
                <input type="text" :value="attribute.value" class="form-control" @input="changeValue($event, attribute.id)">
            </div>
            <div class="form-group">
                <button class="btn btn-danger" @click="removeXmlAttribute(attribute)">Supprimer</button>
            </div>
        </div>
        <div class="row">
            <h2>Les déclarations du fichier XML</h2>
        </div>
        <div class="row">
            <button class="btn btn-success" @click="addXmlDeclaration(createDeclaration())">Ajouter une déclaration</button>
        </div>
        <div class="row pb-2 pt-4 mb-5 border-bottom" v-for="declaration in declarations" :key="`declaration${declaration.id}`">
            <div class="form-group col-md-5">
                <label>Nom</label>
                <input type="text" :value="declaration.name" class="form-control" @input="changeDeclarationName($event, declaration.id)">
            </div>
            <div class="form col-md-5">
                <label>Valeur</label>
                <input type="text" :value="declaration.value" class="form-control" @input="changeDeclarationValue($event, declaration.id)">
            </div>
            <div class="form-group">
                <button class="btn btn-danger" @click="removeXmlDeclaration(declaration)">Supprimer</button>
            </div>
        </div>
    </div>
</template>

<script>
/* eslint-disable */
import { mapActions, mapState } from 'vuex'
import { 
    REMOVE_XML_ATTRIBUTE, 
    ADD_XML_ATTRIBUTE, 
    UPDATE_XML_ATTRIBUTE, 
    ADD_XML_DECLARATION, 
    UPDATE_XML_DECLARATION, 
    REMOVE_XML_DECLARATION 
} from '@/store/csv-to-xml'

export default {
    computed: {
        ...mapState('csvToXml', {
            attributes: state => state.attributes,
            declarations: state => state.declarations
        })
    },
    methods: {
        ...mapActions('csvToXml', [
            ADD_XML_ATTRIBUTE,
            REMOVE_XML_ATTRIBUTE,
            UPDATE_XML_ATTRIBUTE,
            ADD_XML_DECLARATION,
            REMOVE_XML_DECLARATION,
            UPDATE_XML_DECLARATION
        ]),
        ...{
            createAttribute () {
                return {
                    name: '',
                    value: ''
                }
            },
            createDeclaration () {
                return {
                    name: '',
                    value: ''
                }
            },
            changeDeclarationName (event, id) {
                const declaration = this.declarations.find(d => d.id === id)

                declaration.name = event.target.value
                this[UPDATE_XML_DECLARATION] (declaration)
            },
            changeDeclarationValue (event, id) {
                const declaration = this.declarations.find(d => d.id === id)

                declaration.value = event.target.value
                this[UPDATE_XML_DECLARATION] (declaration)
            },
            changeName (event, id) {
                const attribute = this.attributes.find(a => a.id === id)
                
                attribute.name = event.target.value
                this[UPDATE_XML_ATTRIBUTE] (attribute)
            },
            changeValue (event, id) {
                const attribute = this.attributes.find(a => a.id === id)

                attribute.value = event.target.value
                this[UPDATE_XML_ATTRIBUTE] (attribute)
            }
        }
    }
}
</script>
