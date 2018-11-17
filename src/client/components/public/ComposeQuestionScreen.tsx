import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import json from '../../utils/api';

export default class ComposeQuestionScreen extends React.Component<IComposeQuestionScreenProps, IComposeQuestionScreenState>{
    constructor(props: any) {
        super(props);
        this.state = {
            categories: [],
            selectedCategory: '0',
            question: '',
            feedbackMessage: '',
            discord_username: ''
        };

        this.handleSelectChange = this.handleSelectChange.bind(this);
        this.handleQuestionChange = this.handleQuestionChange.bind(this);
        this.handleSubmitQuestion = this.handleSubmitQuestion.bind(this);
        this.handleDiscordNameChange = this.handleDiscordNameChange.bind(this);

    }

    async componentWillMount() {
        try {
            let categories = await json(`/api/categories`);
            this.setState({
                categories
            });
        } catch (error) {
            console.log(error);
        }
    }

    async handleSubmitQuestion(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        if (this.state.question === '' && this.state.selectedCategory === '0') {
            this.setState({ feedbackMessage: 'Are you even trying? Select something and ask a question, fam.' });
            return;
        } else if (this.state.selectedCategory === '0') {
            this.setState({ feedbackMessage: 'Select a category plz! :\\' });
            return;
        } else if (this.state.question === '') {
            this.setState({ feedbackMessage: 'Type a question plz! :\\' });
            return;
        } else {

            let category_id = parseInt(this.state.selectedCategory);
            let question = this.state.question;
            let discord_username = this.state.discord_username;
            let body;

            if (discord_username) {
                body = {
                    question,
                    category_id,
                    discord_username
                };
            } else {
                body = {
                    question,
                    category_id
                };
            }

            try {
                let result = await json(`/api/questions/`, 'POST', body);
            } catch (error) {
                console.log(error);
                alert(`Uh oh, there was an error!  Contact Luke! :(`);
            } finally {
                this.props.history.push(`/${this.state.selectedCategory}`);
                this.setState({
                    question: '',
                    selectedCategory: '0',
                    discord_username: '',
                    feedbackMessage: ''
                });
            };

        };
    }

    handleSelectChange(e: React.ChangeEvent<HTMLSelectElement>) {
        this.setState({ selectedCategory: e.target.value });
    }

    handleQuestionChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
        this.setState({ question: e.target.value })
    }

    handleDiscordNameChange(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState({ discord_username: e.target.value });
    }

    renderCategories() {
        return this.state.categories.map(category => {
            return <option value={category.id}>{category.name}</option>
        });
    }

    render() {
        return (
            <main className="py-5">
                <div className="container py-5">
                    <div className="row">
                        <div className="col">
                            <div className="card shadow-lg">
                                <div className="card-body">
                                    <form onSubmit={this.handleSubmitQuestion}>
                                        <div className="form-group">
                                            <label htmlFor="categorySelect">Category</label>
                                            <select
                                                value={this.state.selectedCategory}
                                                onChange={this.handleSelectChange}
                                                className="form-control"
                                                id="categorySelect">
                                                <option selected value={'0'}>Select a category ...</option>
                                                {this.renderCategories()}
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="question">Question</label>
                                            <textarea
                                                value={this.state.question}
                                                onChange={this.handleQuestionChange}
                                                className="form-control"
                                                id="question"
                                                placeholder="Ask your question .."
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
                                                value={this.state.discord_username}
                                                onChange={this.handleDiscordNameChange}
                                                className="form-control"
                                                placeholder="Your username .. not nickname!"
                                            />
                                        </div>
                                        <small id="discordHelp" className="form-text text-muted">Optional: get a discord message when your question is answered. Your discord username will <i>not</i> be displayed!</small>
                                        <p className="text-center text-danger mt-3">{this.state.feedbackMessage}</p>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        );
    }
}

interface IComposeQuestionScreenProps extends RouteComponentProps {
}

interface IComposeQuestionScreenState {
    categories: { id: number, name: string, _created: Date }[];
    selectedCategory: string;
    question: string;
    feedbackMessage: string;
    discord_username: string;
}