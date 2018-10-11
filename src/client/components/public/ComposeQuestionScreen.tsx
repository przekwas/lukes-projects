import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import ComposeForm from '../shared/ComposeForm';

export default class ComposeQuestionScreen extends React.Component<IComposeQuestionScreen, any>{

    render() {
        return (
            <main className="py-5">
                <div className="container py-5">
                    <div className="row">
                        <div className="col">
                            <div className="card shadow-lg">
                                <div className="card-body">
                                    <ComposeForm />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        );
    }
}

interface IComposeQuestionScreen {
}
