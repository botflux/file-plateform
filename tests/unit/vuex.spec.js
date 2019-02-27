import * as types from '@/stores/types.js'
import store from '@/stores/csv-to-xml.js'


describe ('csvToXml', () => {

    const { mutations } = store

    const makeState = () => ({
        file: {},
        headers: [],
        attributes: [],
        declarations: [],
        fields: [],
        globalTag: '',
        collectionTag: '',
        download: ''
    })

    describe('actions', () => {
        const testAction = (action, payload, state, expectedMutations, done) => {
            let count = 0
          
            // mock commit
            const commit = (type, payload) => {
              const mutation = expectedMutations[count]
          
              try {
                expect(type).toBe(mutation.type)
                if (payload) {
                  expect(payload).toBe(mutation.payload)
                }
              } catch (error) {
                done(error)
              }
          
              count++
              if (count >= expectedMutations.length) {
                done()
              }
            }
          
            // call the action with mocked store and arguments
            action({ commit, state }, payload)
          
            // check if no mutations should have been dispatched
            if (expectedMutations.length === 0) {
              expect(count).toBe(0)
              done()
            }
        }

        const { actions } = store

        it('sets file', done => {
            const file = { name: 'testfile.csv' }
            testAction(actions[types.SET_CSV_TO_XML_FILE], file, { file: {} }, [
                { type: types.SET_CSV_TO_XML_FILE, payload: file }
            ], done)
        })
        it('sets headers', done => {
            const headers = [
                'year',
                'firstName'
            ]

            testAction(actions[types.SET_CSV_TO_XML_HEADERS], headers, { headers: [] }, [
                { type: types.SET_CSV_TO_XML_HEADERS, payload: headers }
            ], done)
        })
        it('sets attributes', done => {
            const attributes = [
                { name: 'a1', value: 'v1' },
                { name: 'a2', value: 'v2' }
            ]

            testAction(actions[types.SET_CSV_TO_XML_ATTRIBUTES], attributes, { attributes: [] }, [
                { type: types.SET_CSV_TO_XML_ATTRIBUTES, payload: attributes }
            ], done)
        })
        it('sets declarations', done => {
            const declarations = [
                { name: 'd1', value: 'v1' },
                { name: 'd2', value: 'v2' }
            ]

            testAction(actions[types.SET_CSV_TO_XML_DECLARATIONS], declarations, { declarations: [] }, [
                { type: types.SET_CSV_TO_XML_DECLARATIONS, payload: declarations }
            ], done)
        })
        it('sets global tag', done => {
            const globalTag = 'Elements'

            testAction(actions[types.SET_CSV_TO_XML_GLOBAL_TAG], globalTag, { globalTag: '' }, [
                { type: types.SET_CSV_TO_XML_GLOBAL_TAG, payload: globalTag }
            ], done)
        })
        it('sets collection tag', done => {
            const collectionTag = 'Element'

            testAction(actions[types.SET_CSV_TO_XML_COLLECTION_TAG], collectionTag, { collectionTag: '' }, [
                { type: types.SET_CSV_TO_XML_COLLECTION_TAG, payload: collectionTag }
            ], done)
        })
        it('sets xml fields', done => {
            const fields = [
                {
                    name: 'Fullname',
                    columns: [ 'firstName', 'lastName' ],
                    concatenation: ' ',
                    type: 'String'
                }, {
                    name: 'Age',
                    columns: [ 'age' ],
                    type: 'Number'
                }
            ]

            testAction(actions[types.SET_CSV_TO_XML_FIELDS], fields, { fields: [] }, [
                { type: types.SET_CSV_TO_XML_FIELDS, payload: fields }
            ], done)
        })
        it('sets xml download', done => {
            const download = 'http://domain.ext/download'

            testAction(actions[types.SET_CSV_TO_XML_DOWNLOAD], download, { download: '' }, [
                { type: types.SET_CSV_TO_XML_DOWNLOAD, payload: download }
            ], done)
        })
    })

    describe('mutations', () => {
        it ('sets file', () => {
            const state = { file: {} }
            const name = 'fakeFile.csv'

            mutations[types.SET_CSV_TO_XML_FILE] (state, { name })

            expect(state.file.name).toBe(name)
        })

        it ('sets headers', () => {
            const state = { headers: [] }
            const headers = [
                'name',
                'age'
            ]

            mutations[types.SET_CSV_TO_XML_HEADERS] (state, headers)

            expect(state.headers).toBe(headers)
        })

        it ('sets attributes', () => {
            const state = { attributes: [] }
            const attributes = [
                { name: 'attr1', value: 'v1' },
                { name: 'attr2', value: 'v2' }
            ]

            mutations[types.SET_CSV_TO_XML_ATTRIBUTES] (state, attributes)

            expect(state.attributes).toBe(attributes)
        })

        it ('sets declarations', () => {
            const state = { declarations: [] }
            const declarations = [
                { name: 'decl1', value: 'v1' },
                { name: 'decl2', value: 'decl2'}
            ]

            mutations[types.SET_CSV_TO_XML_DECLARATIONS] (state, declarations)

            expect(state.declarations).toBe(declarations)
        })

        it ('sets global tag', () => {
            const state = { globalTag: '' }
            const globalTag = 'Elements'

            mutations[types.SET_CSV_TO_XML_GLOBAL_TAG] (state, globalTag)

            expect(state.globalTag).toBe(globalTag)
        })

        it ('sets collection tag', () => {
            const state = { collectionTag: '' }
            const collectionTag = 'Element'

            mutations[types.SET_CSV_TO_XML_COLLECTION_TAG] (state, collectionTag)

            expect(state.collectionTag).toBe(collectionTag)
        })

        it ('sets xml fields', () => {
            const state = { fields: [] }
            const fields = [
                {
                    name: 'Fullname',
                    columns: [ 'firstName', 'lastName' ],
                    concatenation: ' ',
                    type: 'String'
                }, {
                    name: 'Age',
                    columns: [ 'age' ],
                    type: 'Number'
                }
            ]

            mutations[types.SET_CSV_TO_XML_FIELDS] (state, fields)

            expect(state.fields).toBe(fields)
        })

        it ('sets xml download', () => {
            const state = { download: '' }
            const download = 'http://domain.ext/download'

            mutations[types.SET_CSV_TO_XML_DOWNLOAD] (state, download)

            expect(state.download).toBe(download)
        })
    })

    describe('getters', () => {
        const { getters } = store

        describe('gets file is valid', () => {
            it ('happy path', () => {
                const state = { file: { name: 'file' } }
                expect(getters[types.CSV_TO_XML_FILE_IS_VALID] (state)).toBe(true)
            })

            it ('when file is undefined', () => {
                const state = { file: undefined }
                expect(getters[types.CSV_TO_XML_FILE_IS_VALID] (state)).toBe(false)
            })

            it ('when file has\'nt any name', () => {
                const state = { file: {} }
                expect(getters[types.CSV_TO_XML_FILE_IS_VALID] (state)).toBe(false)
            })
        })
        
        describe('gets headers are valid', () => {
            it ('happy path', () => {
                const state = { headers: [ 'firstName' ] }
                expect(getters[types.CSV_TO_XML_HEADERS_ARE_VALID] (state)).toBe(true)
            })

            it ('when headers is empty', () => {
                const state = { headers: [] }
                expect(getters[types.CSV_TO_XML_HEADERS_ARE_VALID] (state)).toBe(false)
            })

            it('when headers is undefined', () => {
                const state = { headers: undefined }
                expect(getters[types.CSV_TO_XML_HEADERS_ARE_VALID] (state)).toBe(false)
            })
        })
        describe('gets attributes are valid', () => {
            it ('happy path', () => {
                const state = {
                    attributes: [
                        { name: 'a', value: 'v' },
                        { name: 'b', value: 'v' }
                    ]
                }
                
                expect(getters[types.CSV_TO_XML_ATTRIBUTES_ARE_VALID] (state)).toBe(true)
            })

            it ('when attributes is empty', () => {
                const state = {
                    attributes: []
                }

                expect(getters[types.CSV_TO_XML_ATTRIBUTES_ARE_VALID] (state)).toBe(true)
            })

            it ('when attribute is undefined', () => {
                const state = {
                    attributes: undefined
                }

                expect(getters[types.CSV_TO_XML_ATTRIBUTES_ARE_VALID] (state)).toBe(false)
            })
        })
        describe('gets declarations are valid', () => {
            it ('happy path', () => {
                const state = {
                    declarations: [
                        { name: 'a', value: 'v' },
                        { name: 'b', value: 'v' }
                    ]
                }

                expect(getters[types.CSV_TO_XML_DECLARATIONS_ARE_VALID] (state)).toBe(true)
            })

            it ('when declarations is empty', () => {
                const state = { declarations: [] }
                expect(getters[types.CSV_TO_XML_DECLARATIONS_ARE_VALID] (state)).toBe(true)
            })

            it ('when declarations is undefined', () => {
                const state = { declarations: undefined }
                expect(getters[types.CSV_TO_XML_DECLARATIONS_ARE_VALID] (state)).toBe(false)
            })
        })
        describe('gets global tag is valid', () => {
            it ('happy path', () => {
                const state = { globalTag: 'Elements' }
                expect(getters[types.CSV_TO_XML_GLOBAL_TAG_IS_VALID] (state)).toBe(true)
            })

            it ('when global tag is empty', () => {
                const state = { globalTag: '' }
                expect(getters[types.CSV_TO_XML_GLOBAL_TAG_IS_VALID] (state)).toBe(false)
            })
        })
        describe('gets collection tag is valid', () => {
            it ('happy path', () => {
                const state = { collectionTag: 'Element' }
                expect(getters[types.CSV_TO_XML_COLLECTION_TAG_IS_VALID] (state)).toBe(true)
            })

            it ('when collection tag is empty', () => {
                const state = { collectionTag: '' }
                expect(getters[types.CSV_TO_XML_COLLECTION_TAG_IS_VALID] (state)).toBe(false)
            })
        })
        describe('gets xml fields are valid', () => {
            it('happy path', () => {
                const state = { fields: [
                    {
                        name: 'Fullname',
                        columns: [ 'firstName', 'lastName' ],
                        concatenation: ' ',
                        type: 'String'
                    }, {
                        name: 'Age',
                        columns: [ 'age' ],
                        type: 'Number'
                    }
                ] }

                expect(getters[types.CSV_TO_XML_FIELDS_ARE_VALID] (state)).toBe(true)
            })

            it ('when fields is undefined', () => {
                const state = { fields: undefined }
                expect(getters[types.CSV_TO_XML_FIELDS_ARE_VALID] (state)).toBe(false)
            })

            it ('when fields is empty', () => {
                const state = { fields: [] }
                expect(getters[types.CSV_TO_XML_FIELDS_ARE_VALID] (state)).toBe(false)
            })
        })
        describe('gets xml download are valid', () => {
            it ('happy path', () => {
                const state = { download: 'blablabla' }
                expect(getters[types.CSV_TO_XML_DOWNLOAD_IS_VALID] (state)).toBe(true)
            })

            it ('when download is empty', () => {
                const state = { download: '' }
                expect(getters[types.CSV_TO_XML_DOWNLOAD_IS_VALID] (state)).toBe(false)
            })
        })
    })
})