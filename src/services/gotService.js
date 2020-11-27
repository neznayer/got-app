
import React from 'react' ;


export default class GotService {

    constructor() {
        this._apiBase = 'https://www.anapioficeandfire.com/api/'
    }

    getRes = async (url) => {
        const res = await fetch(`${this._apiBase}${url}`);
        if (!res.ok){
            throw new Error(`could not fetch ${url}, status: ${res.status}`)
        }
         
        return await res.json();
    }

    getAllCharacters = async () => {
        const res = await this.getRes('characters/?page=5&pageSize=10');
        return res.map(this._transformCharacter);
    }

    getCharacter = async (id) =>{
        const character = await this.getRes(`characters/${id}`);
       
        return this._transformCharacter(character);
    }

    getAllHouses = async () => {
        const res = await this.getRes(`houses/`);
        return res.map(this._transformHouse);
    }

    getHouse = async (id) =>{
        const house = await this.getRes(`houses/${id}`);
        return this._transformHouse(house);
    }

    getAllBooks = async () => {
        const res = await this.getRes(`books/`);
        return res.map(this._transformBook);
    }

    getBook = async (id) =>{
        const book = await this.getRes(`books/${id}`);
        return this._transformBook(book);
    }

    _parseEmptyData = (data) => {
        return (data) ? data : 'no data';
    }

    _parseId = (url) => {

        const regex = /\d+$/
        return url.match(regex)[0];
    }
    _transformCharacter = (char) => {
        
    
        return {
            name: this._parseEmptyData(char.name),
            gender: this._parseEmptyData(char.gender),
            born: this._parseEmptyData(char.born),
            died: this._parseEmptyData(char.died),
            culture: this._parseEmptyData(char.culture),
            key: this._parseId(char.url)
        };
    }

    _transformHouse = (house) => {
        
        return {
            name: this._parseEmptyData(house.name),
            region: this._parseEmptyData(house.region),
            words: this._parseEmptyData(house.words),
            key: this._parseId(house.url)
        }
    }

    _transformBook = (book) => {
        return {
            name: this._parseEmptyData(book.name),
            isbn: this._parseEmptyData(book.isbn),
            numberOfPages: this._parseEmptyData(book.numberOfPages),
            publisher: this._parseEmptyData(book.publisher),
            county: this._parseEmptyData(book.publisher),
            mediaType: this._parseEmptyData(book.mediaType),
            key: this._parseId(book.url)
        }
    }
}
