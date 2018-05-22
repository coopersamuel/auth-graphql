import React from 'react';
import AuthForm from './authForm';
import query from '../queries/currentUser';
import mutation from '../mutations/signup';
import { graphql } from 'react-apollo';
import { hashHistory } from 'react-router';

class SignupForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = { errors: [] }
    }

    componentWillUpdate(nextProps) {
        if (!this.props.data.user && nextProps.data.user) {
            // The user has just logged in! Redirect them to the dashboard
            hashHistory.push('/dashboard');
        }
    }

    onSubmit({ email, password }) {
        this.props.mutate({
            variables: { email, password },
            refetchQueries: [{ query }]
        }).catch(res => { 
            const errors = res.graphQLErrors.map(error => error.message);
            this.setState({ errors });
        });
    }

    render() {
        return (
            <div>
                <h3>Signup</h3>
                <AuthForm errors={this.state.errors} onSubmit={this.onSubmit.bind(this)} />
            </div>
        );
    }
}

export default graphql(query)(
    graphql(mutation)(SignupForm)
);