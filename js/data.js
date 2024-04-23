const { createApp } = Vue;

const now = luxon.DateTime.now();
console.log(now.toLocaleString(luxon.DateTime.DATETIME_SHORT_WITH_SECONDS))

createApp({
    data(){
        return {
            saluta : "ciao",
            activeContact : 0,
            msgActive : 0,
            newMessage : "",
            defaultMsg : "ok",
            searchingItem : "",
            contacts: [
                {
                    name: 'Michele',
                    avatar: '_1',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Hai portato a spasso il cane?',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'Ricordati di stendere i panni',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 16:15:22',
                            message: 'Tutto fatto!',
                            status: 'received'
                        }
                    ],
                },
                {
                    name: 'Fabio',
                    avatar: '_2',
                    visible: true,
                    messages: [
                        {
                            date: '20/03/2020 16:30:00',
                            message: 'Ciao come stai?',
                            status: 'sent'
                        },
                        {
                            date: '20/03/2020 16:30:55',
                            message: 'Bene grazie! Stasera ci vediamo?',
                            status: 'received'
                        },
                        {
                            date: '20/03/2020 16:35:00',
                            message: 'Mi piacerebbe ma devo andare a fare la spesa.',
                            status: 'sent'
                        }
                    ],
                },
                {
                    name: 'Samuele',
                    avatar: '_3',
                    visible: true,
                    messages: [
                        {
                            date: '28/03/2020 10:10:40',
                            message: 'La Marianna va in campagna',
                            status: 'received'
                        },
                        {
                            date: '28/03/2020 10:20:10',
                            message: 'Sicuro di non aver sbagliato chat?',
                            status: 'sent'
                        },
                        {
                            date: '28/03/2020 16:15:22',
                            message: 'Ah scusa!',
                            status: 'received'
                        }
                    ],
                },
                {
                    name: 'Alessandro B.',
                    avatar: '_4',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Lo sai che ha aperto una nuova pizzeria?',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'Si, ma preferirei andare al cinema',
                            status: 'received'
                        }
                    ],
                },
                {
                    name: 'Alessandro L.',
                    avatar: '_5',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Ricordati di chiamare la nonna',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'Va bene, stasera la sento',
                            status: 'received'
                        }
                    ],
                },
                {
                    name: 'Claudia',
                    avatar: '_6',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Ciao Claudia, hai novità?',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'Non ancora',
                            status: 'received'
                        },
                        {
                            date: '10/01/2020 15:51:00',
                            message: 'Nessuna nuova, buona nuova',
                            status: 'sent'
                        }
                    ],
                },
                {
                    name: 'Federico',
                    avatar: '_7',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Fai gli auguri a Martina che è il suo compleanno!',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'Grazie per avermelo ricordato, le scrivo subito!',
                            status: 'received'
                        }
                    ],
                },
                {
                    name: 'Davide',
                    avatar: '_8',
                    visible: true,
                    messages: [
                        {
                            date: '10/01/2020 15:30:55',
                            message: 'Ciao, andiamo a mangiare la pizza stasera?',
                            status: 'received'
                        },
                        {
                            date: '10/01/2020 15:50:00',
                            message: 'No, l\'ho già mangiata ieri, ordiniamo sushi!',
                            status: 'sent'
                        },
                        {
                            date: '10/01/2020 15:51:00',
                            message: 'OK!!',
                            status: 'received'
                        }
                    ],
                }
            ], 
            peopleFound : [],
        }
    },
    created(){
        //Inizializzo peopleFound, in data altrimenti mi da Error
        this.peopleFound = this.contacts.filter(contact => contact.visible)
    },
    methods : {
        //Funzione che setta l'indice attiva su quello clickato dalla chat
        setActive(index){
            this.activeContact = index;
            console.log(this.activeContact)
        },
        addMessage(){
            /*
            Entro nell'array di oggetti peopleFound, utilizzando l'indice attivo, nei messaggi pusho il nuovo messaggio, dove passo come oggetto l'orario, il messaggio e lo status.
            Stessa cosa faccio per la risposta ma settando un timeout di 1s e con status received
            */
            this.peopleFound[this.activeContact].messages.push({
                //Implemento la data e ora odierna con Luxon
                date : now.toLocaleString(luxon.DateTime.DATETIME_SHORT_WITH_SECONDS) ,
                message : this.newMessage,
                status : 'sent', 
            });
            //Rilibero il campo
            this.newMessage = "";
            //Dopo un secondo
            setTimeout(()=> {
                console.log("Funziona");
                //Pusho la risposta
                this.peopleFound[this.activeContact].messages.push({
                    date : now.toLocaleString(luxon.DateTime.DATETIME_SHORT_WITH_SECONDS),
                    message : this.defaultMsg,
                    status : 'received',
                });
            },1000);
        },
        searchPeople() {
            // Filtra i contatti solo se c'è qualcosa nella search bar, quindi se non è ' ', togliendo spazi avanti e dietro
            if (this.searchingItem.trim() !== '') {
                //Itero a questo punto sull'array copiato
                this.peopleFound = this.peopleFound.filter(searchedName => {
                    //restituisce il nomeRicerca -> chiave : name in minuscolo che include -> l'item con quelle lettere in minuscolo
                    console.log(searchedName)
                    return searchedName.name.toLowerCase().includes(this.searchingItem.toLowerCase());
                });

            }  else {
                //Se vuota allora 
                this.peopleFound = this.contacts.filter(contact => contact.visible === true);
            }
        },
        removeMessage(i){
            this.msgActive = i;
            console.log(this.msgActive);
            this.peopleFound[this.activeContact].messages.splice(this.msgActive, 1)
        }
    }
}).mount('#app');