import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import json, { User } from '../../utils/api';
import * as moment from 'moment';

import TableRowAdmin from './TableRowAdmin';

export default class Portal extends React.Component<IPortalProps, IPortalState> {
    constructor(props: any) {
        super(props);
        this.state = {
            questions: [],
            offset: 0
        };
    }

    async componentDidMount() {
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

    async prevTen() {
        let offset = this.state.offset;
        offset -= 10;
        if (offset >= 0) {
            try {
                let prevQuestions = await json(`/api/q/questionsadmin/${offset}`);
                this.setState({ questions: prevQuestions, offset });
            } catch (e) {
                throw e;
            }
        } else {
        }
    }

    async nextTen() {
        let offset = this.state.offset;
        offset += 10;
        try {
            let nextQuestions = await json(`/api/q/questionsadmin/${offset}`);
            this.setState({ questions: nextQuestions, offset });
        } catch (e) {
            console.log(e);
        }
    }

    render() {
        return (
            <main className="py-5">
                <div className="container py-5">
                    <div className="row">
                        <div className="col">
                            <div className="mb-2 d-flex justify-content-between">
                                <h3 >Admin</h3>
                                <div className="btn-group">
                                    <button className="btn btn-info mr-1 shadow" onClick={() => this.prevTen()}>Previous 10</button>
                                    <button className="btn btn-info ml-1 shadow" onClick={() => this.nextTen()}>Next 10</button>
                                </div>
                            </div>
                            <table className="table table-striped table-hover table-bordered shadow-lg">
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
                                            <TableRowAdmin question={question} key={question.id} />
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
    offset: number;
    questions: {
        id: number;
        question: string;
        answered: number;
        _created: Date;
        category: string;
    }[];
}