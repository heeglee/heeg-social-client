export default {
	palette: {
		primary: {
			light: '#ff7301',
			main: '#ed5601',
			dark: '#dc3d01',
			constrastText: '#fff'
		},
		secondary: {
			light: '#fcd55d',
			main: '#ffc900',
			dark: '#ffbb00',
			constrastText: '#fff'
		},
	},
	typography: {
		useNextVariants: true,
	},
	form: {
		textAlign: 'center',
	},
	image: {
		margin: '20px auto',
	},
	mainLogo: {
        width: '250px',
        height: '250px',
        margin: '20px auto',
    },
	pageTitle: {
		margin: '10px auto',
	},
	textField: {
		margin: '10px auto',
	},
	button: {
		marginTop: '20px',
		position: 'relative',
	},
	customError: {
		color: 'red',
		fontSize: '0.8rem',
		marginTop: '10px',
	},
	progress: {
		position: 'absolute',
		left: '25px',
	},
	invisibleSeparator: {
		border: 'none',
		margin: '4px',
	},
	visibleSeparator: {
		width: '100%',
		borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
		marginBottom: '20px',
	},
	paper: {
		padding: '20px',
	},
	profile: {
		'& .image-wrapper': {
			textAlign: 'center',
			position: 'relative',
			'& button': {
				position: 'absolute',
				top: '80%',
				left: '70%'
			}
		},
		'& .profile-image': {
			width: 200,
			height: 200,
			objectFit: 'cover',
			maxWidth: '100%',
			borderRadius: '50%'
		},
		'& .profile-details': {
			textAlign: 'center',
			'& span, svg': {
				verticalAlign: 'middle'
			},
			'& a': {
				color: '#ed5601',
			}
		},
		'& hr': {
			border: 'none',
			margin: '0 0 10px 0'
		},
		'& svg.button': {
			'&:hover': {
				cursor: 'pointer'
			}
		}
	},
	buttons: {
		textAlign: 'center',
		'& a': {
			margin: '20px 10px'
		}
	}
}