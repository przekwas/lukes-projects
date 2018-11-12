import * as React from 'react';
import QuestionTable from '../shared/QuestionTable';
import json from '../../utils/api';

export default class BhamScreen extends React.Component<any, IBhamScreenState>{

    constructor(props: any) {
        super(props);
        this.state = {
            questions: [],
            errorMessage: ''
        };
    }

    async componentWillMount() {
        try {
            let questions = await json(`api/q/questionswithcategory/6`);
            this.setState({
                questions
            });
            if (questions.length === 0) {
                this.setState({ errorMessage: 'No current questions here, ask one!' });
            }
        } catch (error) {
            this.setState({ errorMessage: 'Error with the API! Contact Luke :('});
            console.log(error);
        }
    }

    renderError() {
        if (this.state.errorMessage.length > 0) {
            return <p className="text-danger">{this.state.errorMessage}</p>
        }
    }

    render() {
        return (
            <main className="py-5">
                <div className="container py-5">
                    <div className="row">
                        <div className="col">
                            <h3 className="mb-2">I am Bham Questions</h3>
                            {this.renderError()}
                            <QuestionTable questions={this.state.questions} />
                        </div>
                    </div>
                </div>
            </main>
        );
    }
}

interface IBhamScreenState {
    questions: { id: number; question: string; category: string; _created: Date }[];
    errorMessage: string;
};