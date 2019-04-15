import * as React from 'react';
import * as moment from 'moment';

export interface TableRowProps {
    question: { id: number, question: string, _created: Date };
}

const TableRow: React.SFC<TableRowProps> = props => {

    const { id, question, _created } = props.question;

    return (
        <tr>
            <th scope="row">{id}</th>
            <td>{question}</td>
            <td>{moment(_created).format("dddd, MMM Do YYYY, h:mm a")}</td>
        </tr>
    );
}

export default TableRow;
