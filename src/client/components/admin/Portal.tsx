import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import json, { User } from '../../utils/api';

import TableRowAdmin from './TableRowAdmin';

export default class Portal extends React.Component<IPortalProps, IPortalState> {
    constructor(props: any) {
        super(props);
        this.state = {
            questions: [],
            offset: 0,
            prevDisabled: false,
            nextDisabled: false
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
                let questions = await json(`/api/q/questionsadmin/${offset}`);
                this.setState({
                    questions,
                    offset,
                    prevDisabled: false,
                    nextDisabled: false
                });
            } catch (e) {
                throw e;
            }
        } else {
            this.setState({
                prevDisabled: true,
                nextDisabled: false
            });
        }
    }

    async nextTen() {
        let offset = this.state.offset;
        offset += 10;
        try {
            let questions = await json(`/api/q/questionsadmin/${offset}`);
            if (questions.length === 0) {
                offset -= 10;
                this.setState({
                    offset,
                    nextDisabled: true,
                    prevDisabled: false
                });
            } else {
                this.setState({
                    questions,
                    offset,
                    nextDisabled: false,
                    prevDisabled: false
                });
            }
        } catch (e) {
            console.log(e);
        }
    }

    render() {

        return (
            <main className="py-5">
                <div className="container py-5">
                    <div className="row">
                        <div className="col-md-12 mb-2 d-flex justify-content-between align-items-center">
                            <h4>Admin</h4>
                            <div className="btn-group">
                                <button className="btn btn-info btn-sm mr-1 shadow" disabled={this.state.prevDisabled} onClick={() => this.prevTen()}>Previous 10</button>
                                <button className="btn btn-info btn-sm ml-1 shadow" disabled={this.state.nextDisabled} onClick={() => this.nextTen()}>Next 10</button>
                            </div>
                        </div>
                    </div>
                    <div className="table-responsive">
                        <table className="table table-striped table-hover table-bordered shadow-lg">
                            <thead>
                                <tr>
                                    <th scope="col">id</th>
                                    <th scope="col">Question</th>
                                    <th scope="col">Answered?</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.questions.map(question => {
                                    return (
                                        <TableRowAdmin question={question} key={question.id} />
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main >
        );
    }
};

interface IPortalProps extends RouteComponentProps { }
interface IPortalState {
    offset: number;
    prevDisabled: boolean;
    nextDisabled: boolean;
    questions: {
        id: number;
        question: string;
        answered: number;
        _created: Date;
        category: string;
    }[];
}