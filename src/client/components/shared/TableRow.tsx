import * as React from 'react';
import * as moment from 'moment';

export default class TableRow extends React.Component<ITableRowProps, any> {

    render() {
        let { id, question, _created } = this.props.question;
        return (
            <tr>
                <th scope="row">{id}</th>
                <td>{question}</td>
                <td>{moment(_created).format("dddd, MMM Do YYYY, h:mm a")}</td>
            </tr>
        );
    }
};

interface ITableRowProps {
    question: { id: number, question: string, _created: Date };
};