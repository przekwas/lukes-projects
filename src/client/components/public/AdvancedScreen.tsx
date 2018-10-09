import * as React from 'react';
import QuestionTable from '../shared/QuestionTable';
import json from '../../utils/api';

export default class AdvancedScreen extends React.Component<any, IAdvancedScreenState>{

    constructor(props: any) {
        super(props);
        this.state = {
            questions: []
        };
    }

    async componentWillMount() {
        try {
            let questions = await json(`api/q/questionswithcategory/5`);
            this.setState({
                questions
            });
        } catch (error) {
            console.log(error);
        }
    }

    renderError() {
        if (this.state.questions.length === 0) {
            return <p className="text-danger">Error getting Advanced questions, contact Luke! :(</p>
        }
    }

    render() {
        return (
            <main className="py-5">
                <div className="container py-5">
                    <div className="row">
                        <div className="col">
                            <h3 className="mb-2">Advanced Questions</h3>
                            {this.renderError()}
                            <QuestionTable questions={this.state.questions} />
                        </div>
                    </div>
                </div>
            </main>
        );
    }
}

interface IAdvancedScreenState {
    questions: { id: number; question: string; category: string; _created: Date }[];
};