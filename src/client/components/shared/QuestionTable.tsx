import * as React from 'react';
import TableRow from './TableRow';

export default class QuestionTable extends React.Component<IQuestionTableProps, any> {

    render() {
        return (
            <table className="table table-striped table-bordered shadow-lg">
                <thead>
                    <tr>
                        <th scope="col">id</th>
                        <th scope="col">Question</th>
                        <th scope="col">Asked On</th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.questions.map(question => {
                        return <TableRow key={question.id} question={question} />
                    })}
                </tbody>
            </table>
        );
    }
};

interface IQuestionTableProps {
    questions: {
        id: number,
        question: string,
        category: string,
        _created: Date
    }[];
}