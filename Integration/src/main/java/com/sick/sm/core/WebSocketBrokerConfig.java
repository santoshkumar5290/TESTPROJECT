package com.sick.sm.core;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.AbstractWebSocketMessageBrokerConfigurer;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;

// TODO: Auto-generated Javadoc


    @Configuration
    @EnableWebSocketMessageBroker
    public class WebSocketBrokerConfig extends AbstractWebSocketMessageBrokerConfigurer {

        /* (non-Javadoc)
         * @see org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer#registerStompEndpoints(org.springframework.web.socket.config.annotation.StompEndpointRegistry)
         */
        @Override
        public void registerStompEndpoints(StompEndpointRegistry stompEndpointRegistry) {

            System.out.println("Web Socket Connecting..");
            stompEndpointRegistry.addEndpoint("/websocket-example")
                    .setAllowedOrigins("*");
            stompEndpointRegistry.addEndpoint("/websocket-example")
                    .withSockJS();
        }

        /* (non-Javadoc)
         * @see org.springframework.web.socket.config.annotation.AbstractWebSocketMessageBrokerConfigurer#configureMessageBroker(org.springframework.messaging.simp.config.MessageBrokerRegistry)
         */
        @Override
        public void configureMessageBroker(MessageBrokerRegistry registry) {
            registry.enableSimpleBroker("/topic");
            registry.setApplicationDestinationPrefixes("/app");
        }
}
