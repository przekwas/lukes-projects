import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { findRoute } from '../../utils/findRoute';
import json from '../../utils/api';

export interface ComposeQuestionScreenProps extends RouteComponentProps { }
export interface Categories {
    id: number, name: string, _created: Date;
}

const ComposeQuestionScreen: React.SFC<ComposeQuestionScreenProps> = props => {

    const [feedbackMessage, setFeedbackMessage] = useState<string>('');
    const [discordUsername, setDiscordUsername] = useState<string>('');
    const [question, setQuestion] = useState<string>('');
    const [categories, setCategories] = useState<Array<Categories>>([]);
    const [selectedCategory, setSelectedCategory] = useState<string>('');

    const getCategories = async () => {
        try {
            let categories = await json(`/api/categories`);
            setCategories(categories);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getCategories();
    }, []);

    const submitQuestion = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (question === '' && selectedCategory === '0') {
            setFeedbackMessage('Are you even trying? Select something and ask a question, fam.');
            return;
        } else if (selectedCategory === '0') {
            setFeedbackMessage('Select a category plz! :\\');
            return;
        } else if (question === '') {
            setFeedbackMessage('Type a question plz! :\\');
            return;
        } else {
            let category_id = parseInt(selectedCategory);
            let body;
            if (discordUsername) {
                body = {
                    question,
                    category_id,
                    discordUsername
                };
            } else {
                body = {
                    question,
                    category_id
                };
            }
            try {
                await json(`/api/questions/`, 'POST', body);
            } catch (error) {
                console.log(error);
                alert(`Uh oh, there was an error!  Contact Luke! :(`);
            } finally {
                props.history.push(findRoute(category_id));
            };
        };
    }

    const renderCategories = () => {
        return categories.map(category => {
            return <option key={category.id} value={category.id}>{category.name}</option>
        });
    }

    return (
        <main className="py-5">
            <div className="container py-5">
                <div className="row">
                    <div className="col">
                        <div className="card shadow-lg">
                            <div className="card-body">
                                <form onSubmit={(e: React.FormEvent<HTMLFormElement>) => submitQuestion(e)}>
                                    <div className="form-group">
                                        <label htmlFor="categorySelect">Category</label>
                                        <select
                                            value={selectedCategory}
                                            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSelectedCategory(e.target.value)}
                                            className="form-control">
                                            <option value={'0'}>Select a category ...</option>
                                            {renderCategories()}
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="question">Question</label>
                                        <textarea
                                            value={question}
                                            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setQuestion(e.target.value)}
                                            className="form-control"
                                            placeholder="Ask your question ..."
                                            rows={5}
                                        />
                                    </div>
                                    <button type="submit" className="btn-lg btn btn-info shadow-lg mb-3 d-block">Ask Away!</button>
                                    <label>Discord Username</label>
                                    <div className="input-group">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text">@</span>
                                        </div>
                                        <input
                                            value={discordUsername}
                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDiscordUsername(e.target.value)}
                                            className="form-control"
                                            placeholder="Your username ... not nickname!"
                                        />
                                    </div>
                                    <small className="form-text text-muted">Optional: get a discord message when your question is answered. Your discord username will <i>not</i> be displayed!</small>
                                    <p className="text-center text-danger mt-3">{feedbackMessage}</p>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default ComposeQuestionScreen;





//     async handleSubmitQuestion(e: React.FormEvent<HTMLFormElement>) {

//     }




