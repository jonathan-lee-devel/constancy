package io.jonathanlee.indexservice.controller;

import io.jonathanlee.commonlib.principal.PrincipalHelper;
import io.jonathanlee.indexservice.dto.UserDto;
import java.security.Principal;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/profile")
public class ProfileController {

  @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
  public ResponseEntity<UserDto> getProfile(Principal principal) {
    return ResponseEntity.ok(
        UserDto.builder()
            .id(PrincipalHelper.extractUserId(principal))
            .firstName(PrincipalHelper.extractFirstName(principal))
            .lastName(PrincipalHelper.extractLastName(principal))
        .build()
    );
  }

}
