import React, { useEffect } from 'react';
import { Box, Stack } from '@mui/material';

const LoginPage: React.FC = () => {
  useEffect(() => {
    if (window.catalyst && window.catalyst.auth) {
      window.catalyst.auth.signIn("login");
    } else {
      console.error("Zoho Catalyst SDK is not loaded.");
    }
  }, []);

  return (
    <Stack
      sx={{
        height: "100vh",
        width: "100vw", // Đảm bảo chiều rộng của Stack chiếm toàn bộ viewport
        backgroundColor: "#817c7c1f",
        justifyContent: 'center', // Căn giữa theo chiều dọc
        alignItems: 'center', // Căn giữa theo chiều ngang
        padding: 0,
        overflow: 'hidden', // Ngăn cuộn trên toàn bộ trang
      }}
    >
      <Box
        sx={{
          textAlign: 'center', // Đảm bảo nội dung được căn giữa theo chiều ngang
          width: '100%',
          maxWidth: '100%', // Đảm bảo phần tử chứa không vượt quá chiều rộng của viewport
        }}
      >
        <Box
          component="img"
          src={`${process.env.PUBLIC_URL}/images/logo-color-page-1.png`}
          alt="logo icon"
          sx={{
            display: "block",
            width: "198px",
            height: "50px",
            maxWidth: "100%",
            margin: "0 auto", // Căn giữa hình ảnh theo chiều ngang
          }}
        />
        <Box
          id="login"
          sx={{
            width: '100%',
            height: 'calc(100vh - 60px)', // Đặt chiều cao iframe để phù hợp với kích thước của viewport, trừ chiều cao của logo
            maxWidth: '100%', // Đảm bảo iframe không vượt quá chiều rộng của phần tử chứa
          }}
        >
          {/* iframe login zoho */}
        </Box>
      </Box>
    </Stack>
  );
};

export default LoginPage;
