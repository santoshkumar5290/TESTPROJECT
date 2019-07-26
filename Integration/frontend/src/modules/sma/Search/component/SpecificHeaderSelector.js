import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import classNames from "classnames"
import Input from "@material-ui/core/Input"
import styles from "../styles"
import Typography from '@material-ui/core/Typography'
import ErrorOutline from '@material-ui/icons/ErrorOutline'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Paper from '@material-ui/core/Paper'

class SpecificHeaderSelector extends React.Component {
	onKeypress = (e) => {
		if(e.charCode == 13)
			e.preventDefault();
	}
	render() {
		const { classes, selectedSearchObj } = this.props;
		if (selectedSearchObj.params.condition.length === 0) {
			return <div className={classes.searchField}></div>;
		}
		return selectedSearchObj.params.condition.map((param, id) => {
			switch (param.type) {
				case "TEXT":
					return (
						<div className={classes.textFieldContainer}>

							<Input
								id="search"
								type="search"
								value={this.props.searchInnerObj[param.code[0]] || ''}
								onChange={(e) => this.props.handleValueChange(param.code[0], param.regex, e.target.value)}
								placeholder={param.placeholders[0]}
								className={classes.textField}
								onKeyPress = {(e)=>this.onKeypress(e)}
								fullWidth
								inputProps={{
									'aria-label': 'Description',
								}}
							/>
							<div className={classes.errorContainer}>
								{this.props.errObj[param.code[0]] ?
									<Paper className={classes.errorPaper} elevation={1}>
										<ErrorOutline /> {param.errorString}
									</Paper> : null
								}
							</div>

						</div>
					);
				case "NUMBER":
					return (
						<div className={classNames(classes.searchFieldInner)}>

							<Grid container className={classes.root} spacing={0}>
								<Grid item xs={12}>
									<Typography variant="subheading" gutterBottom>
										{param.label}
									</Typography>
									<Grid container className={classes.root} spacing={8}>
										<Grid item xs={4}>
											<TextField
												id="minNumber1"
												fullWidth
												placeholder={param.placeholders[0]}
												value={this.props.searchInnerObj[param.code[0]] || ''}
												onChange={(e) => this.props.handleNumberChange(param.code[0], param, e)}
												className={classes.textFieldNumber}
												InputLabelProps={{
													shrink: true,
												}}
												margin="normal"
											/>
										</Grid>
										<Grid item xs={4}>
											<TextField
												id="maxNumber1"
												fullWidth
												placeholder={param.placeholders[1]}
												value={this.props.searchInnerObj[param.code[1]] || ''}
												onChange={(e) => this.props.handleNumberChange(param.code[1], param, e)}
												className={this.props.errObj[param.code[1]] ? classNames(classes.textFieldNumber, classes.fieldError) : classes.textFieldNumber}
												InputLabelProps={{
													shrink: true,
												}}
												margin="normal"

											/>
											<div className={classes.errorContainer}>
												{this.props.errObj[param.code[1]] ?
													<Paper className={classes.errorPaper} elevation={1}>
														<ErrorOutline /> {param.errorString}
													</Paper> : null
												}
											</div>
										</Grid>
										<Grid item xs={4}>
											<Typography className={classes.searchLabels} variant="body1">
												{selectedSearchObj.unit}
											</Typography>
										</Grid>
									</Grid>



								</Grid>

							</Grid>
						</div>
					);
				case "ANGLE":
					return (
						<div className={classNames(classes.searchFieldInner)}>

							<Grid container className={classes.root} spacing={0}>
								<Grid item xs={12}>
									<Grid container className={classes.root} spacing={16}>
										<Grid item xs={4}>
											<Typography variant="subheading" gutterBottom>
												{param.label.split(',')[0]}
											</Typography>
											<TextField
												id="minNumber1"
												fullWidth
												placeholder={param.placeholders[0]}
												value={this.props.searchInnerObj[param.code[0]] || ''}
												onChange={(e) => this.props.handleNumberChange(param.code[0], param, e)}
												className={classes.textFieldNumber}
												InputLabelProps={{
													shrink: true,
												}}
												margin="normal"
											/>
										</Grid>
										<Grid item xs={4}>
											<Typography variant="subheading" gutterBottom>
												{param.label.split(',')[1]}
											</Typography>
											<TextField
												id="maxNumber1"
												fullWidth
												placeholder={param.placeholders[1]}
												value={this.props.searchInnerObj[param.code[1]] || ''}
												onChange={(e) => this.props.handleNumberChange(param.code[1], param, e)}
												className={this.props.errObj[param.code[1]] ? classNames(classes.textFieldNumber, classes.fieldError) : classes.textFieldNumber}
												InputLabelProps={{
													shrink: true,
												}}
												margin="normal"

											/>
											<div className={classes.errorContainer}>
												{this.props.errObj[param.code[1]] ?
													<Paper className={classes.errorPaper} elevation={1}>
														<ErrorOutline /> {param.errorString}
													</Paper> : null
												}
											</div>
										</Grid>
										<Grid item xs={4}>
											<Typography variant="subheading" gutterBottom>
												&nbsp;
											</Typography>
											<Typography className={classes.searchLabels} variant="body1">
												{selectedSearchObj.unit}
											</Typography>
										</Grid>
									</Grid>



								</Grid>

							</Grid>
						</div>
					);
				default:
					return null;
			}
		})
	}
}

export default withStyles(styles)(SpecificHeaderSelector);