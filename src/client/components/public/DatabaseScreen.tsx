import * as React from 'react';
import QuestionTable from '../shared/QuestionTable';
import json from '../../utils/api';

export default class DatabaseScreen extends React.Component<any, IDatabaseScreenState>{

    constructor(props: any) {
        super(props);
        this.state = {
            questions: []
        };
    }

    async componentWillMount() {
        try {
            let questions = await json(`api/q/questionswithcategory/4`);
            this.setState({
                questions
            });
        } catch (error) {
            console.log(error);
        }
    }

    renderError() {
        if (this.state.questions.length === 0) {
            return <p className="text-danger">Error getting Database questions, contact Luke! :(</p>
        }
    }

    render() {
        return (
            <main className="py-5">
                <div className="container py-5">
                    <div className="row">
                        <div className="col">
                            <h3 className="mb-2">Database Questions</h3>
                            {this.renderError()}
                            <QuestionTable questions={this.state.questions} />
                        </div>
                    </div>
                </div>
            </main>
        );
    }
}

interface IDatabaseScreenState {
    questions: { id: number; question: string; category: string; _created: Date }[];
};