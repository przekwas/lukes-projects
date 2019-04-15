import * as React from 'react';
import TableRow from './TableRow';

export interface QuestionTableProps {
    questions: {
        id: number,
        question: string,
        category: string,
        _created: Date
    }[];
}

const QuestionTable: React.SFC<QuestionTableProps> = ({ questions }) => {
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
                {questions.map(question => {
                    return <TableRow key={question.id} question={question} />
                })}
            </tbody>
        </table>
    );
}

export default QuestionTable;