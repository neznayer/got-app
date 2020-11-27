import React, {Component} from "react";
import ItemDetails, {Field} from '../itemDetails';
import GotService from "../../services/gotService";

export default class BooksItem extends Component {
    gotService = new GotService();



    render () {
        return (
            <ItemDetails 
            itemId={this.props.bookId}
            getData={this.gotService.getBook}>
            <Field field='publisher' label = 'Publisher'/>
            <Field field='country' label='Country'/>
            <Field field='numberOfPages' label = 'Pages'/>
            <Field field='mediaType' label='Media type'/>
        </ItemDetails>
        )

    }
}