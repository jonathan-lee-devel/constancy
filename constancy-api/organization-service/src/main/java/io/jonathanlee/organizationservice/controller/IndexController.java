package io.jonathanlee.organizationservice.controller;

import io.jonathanlee.commonlib.principal.PrincipalHelper;
import java.security.Principal;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping("/organizations")
public class IndexController {

  @GetMapping
  public ResponseEntity<String> index(Principal principal) {
    log.info("Request from user ID: {}", PrincipalHelper.extractUserId(principal));
    return ResponseEntity.ok(String.format("Hello %s%n%s",
        PrincipalHelper.extractFirstName(principal),
        PrincipalHelper.extractLastName(principal)
    ));
  }

}
