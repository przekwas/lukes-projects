import * as React from 'react';

export default class Home extends React.Component<any, any>{
    render() {
        return (
            <main className="py-5">
                <div className="container py-5">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="card shadow-lg">
                                <div className="card-body">
                                    <p>Select which category you wish to add your question to in the top right of your navbar!</p>
                                    <p>Add it to the list and I'll make sure to check it everyday as I finish building out this webapp.  :)</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        );
    }
}