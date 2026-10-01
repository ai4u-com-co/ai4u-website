import React from 'react';
import FaceTile from './FaceTile';

// Avatar chico del agente (confirmación de reclutamiento): el mismo rostro y color de su tarjeta.
const Identicon: React.FC<{ name: string }> = ({ name }) => <FaceTile name={name} className="a4-agentes-ident" />;

export default Identicon;
