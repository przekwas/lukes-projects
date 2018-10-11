import * as React from 'react';
import json from '../../utils/api';

export default class ComposeForm extends React.Component<IComposeFormProps, IComposeFormState> {

    constructor(props: any) {
        super(props);
        this.state = {
            categories: [],
            selectedCategory: '0',
            question: ''
        };

        this.handleSelectChange = this.handleSelectChange.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmitQuestion = this.handleSubmitQuestion.bind(this);
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

    handleSelectChange(e: React.ChangeEvent<HTMLSelectElement>) {
        this.setState({ selectedCategory: e.target.value });
    }

    handleInputChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
        this.setState({ question: e.target.value })
    }

    async handleSubmitQuestion(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        let category_id: number = parseInt(this.state.selectedCategory);
        let question: string = this.state.question;

        try {
            let result = await json(`/api/questions/`, 'POST', {
                question,
                category_id
            });
        } catch (error) {
            console.log(error);
            alert(`Uh oh, there was an error!  Contact Luke! :(`);
        } finally {
            this.setState({
                question: '',
                selectedCategory: '0'
            });
        }
    }

    renderCategories() {
        return this.state.categories.map(category => {
            return <option value={category.id}>{category.name}</option>
        });
    }

    render() {
        return (
            <form onSubmit={this.handleSubmitQuestion}>
                <div className="form-group">
                    <label htmlFor="categorySelect">Category?</label>
                    <select value={this.state.selectedCategory} onChange={this.handleSelectChange} className="form-control" id="categorySelect">
                        <option selected>Select a category ...</option>
                        {this.renderCategories()}
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="exampleFormControlTextarea1">Question</label>
                    <textarea value={this.state.question} onChange={this.handleInputChange} className="form-control" id="exampleFormControlTextarea1" rows={5} />
                </div>
                <button type="submit" className="btn btn-info btn-lg">Ask Away!</button>
            </form>
        );
    }
};

interface IComposeFormProps {

 }

interface IComposeFormState {
    categories: { id: number, name: string, _created: Date }[];
    selectedCategory: string;
    question: string;
}

