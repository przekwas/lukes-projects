import * as React from 'react';

export default class Portal extends React.Component<any, IPortalState> {
    constructor(props: any) {
        super(props);
        this.state = {
            isAnswered: false
        };
    }

    handleCheckboxToggle(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState({
            isAnswered: e.target.checked
        });
    }

    render() {
        return (
            <main className="py-5">
                <div className="container py-5">
                    <div className="row">
                        <div className="col">
                            <h3 className="mb-2">All Questions</h3>
                            <table className="table table-striped table-bordered shadow-lg">
                                <thead>
                                    <tr>
                                        <th scope="col">id</th>
                                        <th scope="col">Question</th>
                                        <th scope="col">Asked On</th>
                                        <th scope="col">Answered?</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th scope="row">id Test</th>
                                        <td>Question Test</td>
                                        <td>Date Test</td>
                                        <td>
                                            <div className="form-check">
                                                <input
                                                    className="form-check-input position-static"
                                                    type="checkbox"
                                                    checked={this.state.isAnswered}
                                                    onChange={(e) => this.handleCheckboxToggle(e)}
                                                />
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </main>
        );
    }
};

interface IPortalState {
    isAnswered: boolean;
}