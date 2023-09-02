package io.jonathanlee.indexservice.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.view.RedirectView;

@RestController
@RequestMapping("/")
public class IndexController {

  @Value("${constancy.front-end.url}")
  private String frontEndUrl;

  @GetMapping
  public RedirectView index() {
    return new RedirectView(String.format("%s/keycloak-login-success", frontEndUrl));
  }

}
