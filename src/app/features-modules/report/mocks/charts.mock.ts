import { Chart } from '../models/chart.model';

export const mockTipoDocumentos: Chart[] = [
    {
      "name": "Comunicação",
      "value": 40632
    },
    {
      "name": "Carta",
      "value": 50000
    },
    {
      "name": "Ofício",
      "value": 36745
    },
    {
      "name": "Exposição",
      "value": 36240
    },
    {
      "name": "Reclamação",
      "value": 33000
    },
    {
      "name": "Outros",
      "value": 35800
    }
];

export const mockEstadoDocumentos: Chart[] = [
    {
      "name": "REGISTADOS",
      "value": 50000
    },
    {
      "name": "EM DESPACHO",
      "value": 36745
    },
    {
      "name": "DESPACHADOS",
      "value": 36240
    },
    {
      "name": "EM ANALISE",
      "value": 33000
    },
    {
      "name": "ARQUIVADOS",
      "value": 35800
    }
];

export const mockOutrosEstados: Chart[] = [
  {
    "name": "Processos Reabertos",
    "value": 10
  },
  {
    "name": "Processos Atrasados",
    "value": 6
  }
];

export const mockTipoTratamento: Chart[] = [
  {
    "name": "Tratamento Interno",
    "value": 40632
  },
  {
    "name": "Tratamento Externo",
    "value": 50000
  },
  {
    "name": "Tratamento Interno/Externo",
    "value": 36745
  }
];

export const mockAllReports: Chart[] = [ ...mockTipoDocumentos, ...mockEstadoDocumentos, ...mockOutrosEstados, ...mockTipoTratamento ];
