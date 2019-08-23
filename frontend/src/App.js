import React, { useState, useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import MenuTop from './components/Header/Menu';
import MenuBottom from './components/Bottom/MenuBottom';
import PostList from './components/Post/PostList';
import ClassesList from './components/Classes/ClassesList';
import SemesterList from './components/Semester/SemestersList';
import DisciplineList from './components/Discipline/DisciplineList';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import api from './services/api';
import { getPosts } from './actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

const styles = theme => ({
  chip: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    marginTop: theme.spacing.unit,
  },
});

function App(props){

	const [search, setSearch] = useState('')
	const [loading, setLoading] = useState(true)
	const [posts, setPosts] = useState([])

	const { classes, getPosts, postsData } = props

	const handleChange = e => {
		setSearch(e.target.value)
	}

	const handleSubmit = async e => {
		if (e.key === 'Enter' ) {
			setLoading(true)
			await getPosts(null, search)
			setLoading(false)
		}
	}

	useEffect( () => {
    setLoading(true)
    getPosts(null, search)
    setLoading(false)
	}, [])

	useEffect( () => {
    setPosts(postsData)
	}, [postsData])


	return (
		<Grid container spacing={16}>
			<MenuTop/>
			<Grid item xs={12}>
				<Grid container justify="center" alignItems="center">
					<Grid item xs={12} md={6} style={{marginTop: 0}}>
						<TextField
						  type="search"
				          id="standard-helperText"
				          label="What do you need?"
				          margin="normal"
				          fullWidth
				          variant="outlined"
				          autoFocus
				          value={search}
				          onChange={handleChange}
				          onKeyDown={handleSubmit}
				        />
					</Grid>
				</Grid>
				{loading && <Grid container justify="center" alignItems="center"><CircularProgress /></Grid> }
				{!loading && (
  					<>
  					{(
  						<PostList posts={posts}/>
  					)}
  				</>
  			)}
        <MenuBottom />
			</Grid>
		</Grid>
	)
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    postsData: state.posts.posts,
});

const mapDispatchToProps = dispatch => bindActionCreators({ getPosts }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(App));
