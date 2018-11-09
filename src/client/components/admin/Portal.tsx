import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import * as moment from 'moment';

import json, { User } from '../../utils/api';

export default class Portal extends React.Component<IPortalProps, IPortalState> {
    constructor(props: any) {
        super(props);
        this.state = {
            questions: [],
            feedback: ''
        };
    }

    async componentWillMount() {
        try {
            if (!User || User.role !== "admin") {
                this.props.history.replace('/');
            } else {
                let questions = await json('/api/q/questionsadmin');
                this.setState({ questions });
            }
        } catch (e) {
            throw e;
        }
    }

    async handleCheckboxToggle(e: React.ChangeEvent<HTMLInputElement>) {

        let questions = this.state.questions;
        let key = Number(e.target.name);
        let id = questions[key].id;

        if (questions[key].answered === 0) {
            questions[key].answered = 1;
        } else {
            questions[key].answered = 0;
        }

        try {
            let res = await json(`/api/questions/${id}`, 'PUT', {
                id,
                answered: questions[key].answered
            });
            this.setState({ questions });
        } catch (e) {
            this.setState({ feedback: 'Error saving questions, contact Luke!' });
        }

    }

    render() {
        return (
            <main className="py-5">
                <div className="container py-5">
                    <div className="row">
                        <div className="col">
                            <div className="d-flex justify-content-between align-items-center mb-1">
                                <h3 className="mb-2">Admin</h3>
                                <span className="text-danger">{this.state.feedback}</span>
                            </div>
                            <table className="table table-striped table-bordered shadow-lg">
                                <thead>
                                    <tr>
                                        <th scope="col">id</th>
                                        <th scope="col">Question</th>
                                        <th scope="col">Answered?</th>
                                    </tr>
                                </thead>
                                <tbody>

                                    {this.state.questions.map((question, index) => {
                                        return (
                                            <tr>
                                                <th scope="row">{question.id}</th>
                                                <td>{question.question}</td>
                                                <td>
                                                    <div className="form-check">
                                                        <input
                                                            name={index.toString()}
                                                            className="form-check-input"
                                                            type="checkbox"
                                                            checked={question.answered === 0 ? false : true}
                                                            onChange={(e) => this.handleCheckboxToggle(e)}
                                                        />
                                                        {question.answered === 0 ? <span className="text-danger">Unanswered</span> : <span className="text-success">Answered</span>}
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })}

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </main >
        );
    }
};

interface IPortalProps extends RouteComponentProps { }
interface IPortalState {
    feedback: string;
    questions: {
        id: number;
        question: string;
        answered: number;
        _created: Date;
        category: string;
    }[];
}