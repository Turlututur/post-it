import React from 'react';

/**
 * Les variables globales de l'application :
 *  - Le token pour gérer les autorisations de l'api.
 *  - Le nom de l'utilisateur connecté
 *  - Le rôle de l'utilisateur connecté.
 */

export const TokenContext = React.createContext();

export const UsernameContext = React.createContext();

export const UserRoleContext = React.createContext();
