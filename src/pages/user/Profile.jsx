import { useAuth } from '../../context/AuthContext';
import {
  Container,
  Paper,
  Typography,
  Box,
  Grid,
  Divider,
  Avatar
} from '@mui/material';
import { AccountCircle, Phone, Badge, Security } from '@mui/icons-material';

export function Profile() {
  const { user, isAdmin } = useAuth();

  if (!user) {
    return (
      <Box
        sx={{
          height: 'calc(100vh - 64px)', // adjust for navbar height
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#f4f6f8'
        }}
      >
        <Paper elevation={3} sx={{ p: 4, textAlign: 'center', borderRadius: 3 }}>
          <Typography variant="h5" gutterBottom>
            Please log in to view your profile
          </Typography>
        </Paper>
      </Box>
    );
  }

  return (
    <Box
      sx={{
         width:"100vw",
         height:"100vh",
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f4f6f8',
        px: 2
      }}
    >
      <Container maxWidth="sm" sx={{ p: 0 }}>
        <Paper
          elevation={4}
          sx={{
            p: 4,
            borderRadius: 4,
            width: '100%',
            backgroundColor: '#fff'
          }}
        >
          {/* Header Section */}
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
            <Avatar
              sx={{
                width: 80,
                height: 80,
                mr: 3,
                bgcolor: '#1976d2',
                boxShadow: 3
              }}
            >
              <AccountCircle sx={{ fontSize: 60 }} />
            </Avatar>
            <Box>
              <Typography variant="h4" component="h1" fontWeight={600}>
                {isAdmin ? 'Admin Profile' : 'User Profile'}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {isAdmin ? user.id : user.user_name}
              </Typography>
            </Box>
          </Box>

          <Divider sx={{ mb: 3 }} />

          {/* Info Grid */}
          <Grid container spacing={3}>
            {isAdmin ? (
              <>
                <Grid item xs={12}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Badge color="primary" />
                    <Box>
                      <Typography variant="caption" color="text.secondary">
                        Admin ID
                      </Typography>
                      <Typography variant="body1">{user.id}</Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Security color="primary" />
                    <Box>
                      <Typography variant="caption" color="text.secondary">
                        Role
                      </Typography>
                      <Typography variant="body1">Administrator</Typography>
                    </Box>
                  </Box>
                </Grid>
              </>
            ) : (
              <>
                <Grid item xs={12} sm={6}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Badge color="primary" />
                    <Box>
                      <Typography variant="caption" color="text.secondary">
                        User ID
                      </Typography>
                      <Typography variant="body1">{user.user_id}</Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <AccountCircle color="primary" />
                    <Box>
                      <Typography variant="caption" color="text.secondary">
                        Name
                      </Typography>
                      <Typography variant="body1">{user.user_name}</Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Phone color="primary" />
                    <Box>
                      <Typography variant="caption" color="text.secondary">
                        Mobile
                      </Typography>
                      <Typography variant="body1">
                        {user.mobile || 'Not provided'}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
              </>
            )}
          </Grid>

          {/* Footer Info */}
          <Box
            sx={{
              mt: 4,
              p: 2,
              bgcolor: '#f5f5f5',
              borderRadius: 2,
              textAlign: 'center'
            }}
          >
            <Typography variant="body2" color="text.secondary">
              Account created:{' '}
              {new Date(user.created_at).toLocaleDateString('en-IN')}
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}

