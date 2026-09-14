
package com.ecommerce.userservice.service;

import com.ecommerce.userservice.entity.User;
import com.ecommerce.userservice.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.security.crypto.password.PasswordEncoder;
import static org.mockito.Mockito.when;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.Mockito.verify;
import static org.junit.jupiter.api.Assertions.assertEquals;
import com.ecommerce.userservice.security.JwtService;


@ExtendWith(MockitoExtension.class)
public class UserServiceTest {
    @Mock
    private UserRepository userRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private JwtService jwtService;

    @Test
    void registerUser_success() {

        User user = new User();

        user.setName("Suchi");
        user.setEmail("suchi@gmail.com");
        user.setPassword("hello123");
        user.setRole("USER");

        when(passwordEncoder.encode("hello123"))
                .thenReturn("FAKE_HASH");

        when(userRepository.save(user))
                .thenReturn(user);

        UserService userService = new UserService(userRepository, passwordEncoder, jwtService);

        User result = userService.registerUser(user);

        assertNotNull(result);
    }
    @Test
    void registerUser_passwordIsHashed() {
        User user = new User();

        user.setName("Suchi");
        user.setEmail("suchi@gmail.com");
        user.setPassword("hello123");
        user.setRole("USER");

        when(passwordEncoder.encode("hello123"))
                .thenReturn("FAKE_HASH");

        UserService userService = new UserService(userRepository, passwordEncoder, jwtService);
        userService.registerUser(user);
        verify(passwordEncoder).encode("hello123");
    }
    @Test
    void registerUser_repositorySaveCalled() {
        User user = new User();

        user.setName("Suchi");
        user.setEmail("suchi@gmail.com");
        user.setPassword("hello123");
        user.setRole("USER");

        when(passwordEncoder.encode("hello123"))
                .thenReturn("FAKE_HASH");

        UserService userService = new UserService(userRepository, passwordEncoder, jwtService);

        userService.registerUser(user);
        verify(userRepository).save(user);
    }
    @Test
    void registerUser_returnsSavedUser() {
        User user = new User();

        user.setName("Suchi");
        user.setEmail("suchi@gmail.com");
        user.setPassword("hello123");
        user.setRole("USER");
        when(passwordEncoder.encode("hello123"))
                .thenReturn("FAKE_HASH");
        when(userRepository.save(user))
                .thenReturn(user);

        UserService userService = new UserService(userRepository, passwordEncoder, jwtService);
        User result = userService.registerUser(user);
        assertEquals(user, result);
    }

}