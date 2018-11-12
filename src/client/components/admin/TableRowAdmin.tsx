import * as React from 'react';
import json, { User } from '../../utils/api';

export default class TableRowAdmin extends React.Component<ITableRowAdminProps, ITableRowAdminState> {
    constructor(props: any) {
        super(props)
        this.state = {
            question: {
                id: 0,
                question: '',
                answered: 0
            }
        };
    }

    componentWillMount() {
        this.setState({ question: this.props.question })
    }

    async handleButtonClick(e: React.MouseEvent<HTMLButtonElement>) {

        let question = this.state.question;
        let id = question.id;
        let answered = question.answered;

        if (answered === 0) {
            answered = 1;
        } else {
            answered = 0;
        };

        question.answered = answered;

        try {
            let res = await json(`/api/questions/${id}`, 'PUT', {
                id,
                answered
            });

            this.setState({ question });
        } catch (e) {
            throw e;
        }
    }

    render() {
        const { id, question, answered } = this.state.question;
        return (
            <tr>
                <th scope="row">{id}</th>
                <td>{question}</td>
                <td>
                    <div>
                        {
                            answered === 0 ?
                                <button onClick={(e) => this.handleButtonClick(e)} className="btn btn-sm btn-danger">Not Yet</button>
                                :
                                <button onClick={(e) => this.handleButtonClick(e)} className="btn btn-sm btn-success">Answered</button>
                        }
                    </div>
                </td>
            </tr>
        );
    }
};

interface ITableRowAdminProps {
    question: {
        id: number;
        question: string;
        answered: number;
    };
};

interface ITableRowAdminState {
    question: {
        id: number;
        question: string;
        answered: number;
    };
};