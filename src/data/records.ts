export type InformationRecord = {
  id: string
  recordName: string
  recordDescription: string
  revision: string
  suitability: string
  author: string
  createdOn: string
  workflowStatus: string
}

export const RECORDS: InformationRecord[] = [
  {
    id: 'rec-1',
    recordName: 'PR1-TRMB-ZZ-DR-A-0002_Roof Plan',
    recordDescription: 'Proposed renovation of existing 2 storey building',
    revision: 'P01',
    suitability: 'S01',
    author: 'Vincy Antony',
    createdOn: '11/02/2026',
    workflowStatus: 'Draft',
  },
  {
    id: 'rec-2',
    recordName: 'PR1-TRMB-ZZ-DR-A-0003_Ground Floor Plan',
    recordDescription: 'Existing ground floor layout with proposed partitions',
    revision: 'P02',
    suitability: 'S02',
    author: 'Alex Chen',
    createdOn: '11/04/2026',
    workflowStatus: 'Draft',
  },
  {
    id: 'rec-3',
    recordName: 'PR1-TRMB-ZZ-DR-S-0101_Foundation Plan',
    recordDescription: 'Structural foundation plan for the north wing',
    revision: 'C01',
    suitability: 'S01',
    author: 'Jordan Patel',
    createdOn: '11/06/2026',
    workflowStatus: 'Draft',
  },
  {
    id: 'rec-4',
    recordName: 'PR1-TRMB-ZZ-SP-A-0008_Specification',
    recordDescription: 'Architectural specification for interior finishes',
    revision: 'P01',
    suitability: 'S03',
    author: 'Vincy Antony',
    createdOn: '11/08/2026',
    workflowStatus: 'Draft',
  },
  {
    id: 'rec-5',
    recordName: 'PR1-TRMB-ZZ-DR-M-0204_HVAC Layout',
    recordDescription: 'Mechanical HVAC zoning for levels 1 and 2',
    revision: 'P03',
    suitability: 'S01',
    author: 'Sam Rivera',
    createdOn: '11/10/2026',
    workflowStatus: 'Draft',
  },
  {
    id: 'rec-6',
    recordName: 'PR1-TRMB-ZZ-DR-E-0302_Lighting Plan',
    recordDescription: 'Electrical lighting layout for common areas',
    revision: 'P01',
    suitability: 'S02',
    author: 'Alex Chen',
    createdOn: '11/12/2026',
    workflowStatus: 'Draft',
  },
  {
    id: 'rec-7',
    recordName: 'PR1-TRMB-ZZ-DR-A-0012_Elevations',
    recordDescription: 'North and east elevations for planning review',
    revision: 'P04',
    suitability: 'S01',
    author: 'Jordan Patel',
    createdOn: '11/14/2026',
    workflowStatus: 'Draft',
  },
  {
    id: 'rec-8',
    recordName: 'PR1-TRMB-ZZ-SH-A-0044_Door Schedule',
    recordDescription: 'Door types, fire ratings, and hardware sets',
    revision: 'P01',
    suitability: 'S04',
    author: 'Vincy Antony',
    createdOn: '11/16/2026',
    workflowStatus: 'Draft',
  },
]
