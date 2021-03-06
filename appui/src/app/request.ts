export const requests = [
    {
      id: 1,
      recipient: 1,
      date_required: '2020-01-03',
      priority: 'normal',
      req_details: [{ request: 1, description: 'SET UP / ADJUSTMENT', remarks: 'Your remarks.' },
                    { request: 2, description: 'REPAIR / REPLACEMENT', remarks: 'Remarks' }],
      description: 'This is a description. URGENT!',
      machine: 'none',
      representative: '1',
      department: 'opt',
      stopped: '2020-10-23T22:01',
      status: 'delivered'
    },
    {
      id: 2,
      recipient: 2,
      date_required: '2020-02-04',
      priority: 'urgent',
      req_details: [{ request: 1, description: 'SET UP / ADJUSTMENT', remarks: 'Your remarks.', req_dtl_id: 1 },
                    { request: 2, description: 'REPAIR / REPLACEMENT', remarks: 'Remarks', req_dtl_id: 2 }],
      description: 'ANOTHER DESCRIPTION?!',
      machine: 'none',
      representative: '1',
      department: 'opt',
      stopped: '2020-10-23T22:01',
      status: 'delivered'
    },
    {
      id: 3,
      recipient: 1,
      date_required: '2020-03-05',
      priority: 'normal',
      req_details: [{ request: 1, description: 'SET UP / ADJUSTMENT', remarks: 'Your remarks.' },
                    { request: 2, description: 'REPAIR / REPLACEMENT', remarks: 'Remarks' }],
      description: 'WHAT A DESCRIPTION!',
      machine: 'none',
      representative: '1',
      department: 'opt',
      stopped: '2020-10-23T22:01',
      status: 'delivered'
    },
    {
      id: 4,
      recipient: 1,
      date_required: '2020-01-03',
      priority: 'normal',
      req_details: [{ request: 1, description: 'SET UP / ADJUSTMENT', remarks: 'Your remarks.' },
                    { request: 2, description: 'REPAIR / REPLACEMENT', remarks: 'Remarks' }],
      description: 'This is a description. URGENT! HUHUHU',
      machine: 'none',
      representative: '1',
      department: 'opt',
      stopped: '2020-10-23T22:01',
      status: 'approved'
    },
    {
      id: 5,
      recipient: 2,
      date_required: '2020-02-04',
      priority: 'urgent',
      req_details: [{ request: 1, description: 'SET UP / ADJUSTMENT', remarks: 'Your remarks.' },
                    { request: 2, description: 'REPAIR / REPLACEMENT', remarks: 'Remarks' }],
      description: 'HEHEEHEHEHEHEH?!',
      machine: 'none',
      representative: '1',
      department: 'opt',
      stopped: '2020-10-23T22:01',
      status: 'approved'
    },
    {
      id: 6,
      recipient: 1,
      date_required: '2020-03-05',
      priority: 'normal',
      req_details: [{ request: 1, description: 'SET UP / ADJUSTMENT', remarks: 'Your remarks.' },
                    { request: 2, description: 'REPAIR / REPLACEMENT', remarks: 'Remarks' }],
      description: 'HAHHAHAAHHAAHA!',
      machine: 'none',
      representative: '1',
      department: 'opt',
      stopped: '2020-10-23T22:01',
      status: 'approved'
    },
    {
      id: 7,
      recipient: 1,
      date_required: '2020-01-03',
      priority: 'normal',
      req_details: [{ request: 1, description: 'SET UP / ADJUSTMENT', remarks: 'Your remarks.' },
                    { request: 2, description: 'REPAIR / REPLACEMENT', remarks: 'Remarks' }],
      description: 'This is a description. URGENT! HUHUHU',
      machine: 'none',
      representative: '1',
      department: 'opt',
      stopped: '2020-10-23T22:01',
      status: 'wip'
    },
    {
      id: 8,
      recipient: 2,
      date_required: '2020-02-04',
      priority: 'urgent',
      req_details: [{ request: 1, description: 'SET UP / ADJUSTMENT', remarks: 'Your remarks.' },
                    { request: 2, description: 'REPAIR / REPLACEMENT', remarks: 'Remarks' }],
      description: 'HEHEEHEHEHEHEH?!',
      machine: 'none',
      representative: '1',
      department: 'opt',
      stopped: '2020-10-23T22:01',
      status: 'wip'
    },
    {
      id: 9,
      recipient: 1,
      date_required: '2020-03-05',
      priority: 'normal',
      req_details: [{ request: 1, description: 'SET UP / ADJUSTMENT', remarks: 'Your remarks.' },
                    { request: 2, description: 'REPAIR / REPLACEMENT', remarks: 'Remarks' }],
      description: 'HAHHAHAAHHAAHA!',
      machine: 'none',
      representative: '1',
      department: 'opt',
      stopped: '2020-10-23T22:01',
      status: 'wip'
    },
    {
      id: 10,
      recipient: 1,
      date_required: '2020-03-05',
      priority: 'normal',
      req_details: [{ request: 1, description: 'SET UP / ADJUSTMENT', remarks: 'Your remarks.' },
                    { request: 2, description: 'REPAIR / REPLACEMENT', remarks: 'Remarks' }],
      description: 'HAHHAHAAHHAAHA!',
      machine: 'none',
      representative: '1',
      department: 'opt',
      stopped: '2020-10-23T22:01',
      status: 'completed'
    }
  ];
