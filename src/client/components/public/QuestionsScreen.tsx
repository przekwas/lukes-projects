import * as React from 'react';
import { useState, useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import QuestionTable from '../shared/QuestionTable';
import json from '../../utils/api';

export interface QuestionsScreenProps extends RouteComponentProps<{ category: string, id: string }> { }
export interface Questions {
    id: number,
    question: string,
    category: string,
    _created: Date
}

const QuestionsScreen: React.SFC<QuestionsScreenProps> = props => {

    const [questions, setQuestions] = useState<Questions[]>([]);
    const [errorMessage, setErrorMessage] = useState<string>('');

    const getQuestions = async () => {
        let id = props.match.params.id;
        try {
            let questions = await json(`/api/q/questionswithcategory/${id}`);
            setQuestions(questions);
            if (questions.length === 0) {
                setErrorMessage('No current questions here, ask one!');
            }
        } catch (error) {
            setErrorMessage('Error with the API! Contact Luke :(');
            console.log(error);
        }
    };

    useEffect(() => {
        getQuestions();
    }, [props.match.params.id]);

    const renderError = () => {
        if (errorMessage.length > 0) {
            return <p className="text-danger">{errorMessage}</p>
        }
    }

    return (
        <main className="py-5">
            <div className="container py-5">
                <div className="row">
                    <div className="col-md-12">
                        <h3 className="mb-2">{props.match.params.category} Questions</h3>
                        {renderError()}
                        <QuestionTable questions={questions} />
                    </div>
                </div>
            </div>
        </main>
    );
}

export default QuestionsScreen;