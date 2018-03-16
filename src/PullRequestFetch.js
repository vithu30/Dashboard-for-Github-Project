// Copyright (c) 2018 WSO2 Inc. (http://www.wso2.org) All Rights Reserved.
//
// WSO2 Inc. licenses this file to you under the Apache License,
// Version 2.0 (the "License"); you may not use this file except
// in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing,
// software distributed under the License is distributed on an
// "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
// KIND, either express or implied. See the License for the
// specific language governing permissions and limitations
// under the License.

import React, { Component} from 'react';
import {DataType, TacoTable, SortDirection} from 'react-taco-table';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import './react-taco-table.css';
import './App.css';
import './react-bootstrap-table.min.css';

const url = 'http://localhost:9090/BallerinaService/pullRequests';
const summaryUrl = 'http://localhost:9090/BallerinaService/summaryOfPullRequests';
const options = {
    clearSearch: true,
    defaultSortName: 'Days',
    defaultSortOrder: 'asc'
};

const urlNavigation = (cell) => {
    let link = `${cell}`;
    return (
        <a href={link} target="_blank" >{link}</a>
    )
};
const summaryColoumn = [
    {
        id: 'productName',
        type: DataType.String,
        header: 'Product',
    },
    {
        id: 'Total',
        type: DataType.String,
        header: 'Number of PRs',
    },

];

class pullRequestData extends Component{
    constructor(props){
        super(props);
        this.state = {
            data : [],
            summary :[],
        };
    }
    componentDidMount() {
        fetch(url)
            .then((pullRequests)=> pullRequests.json())
            .then((jsonPullRequests)=>
                {
                    console.log(jsonPullRequests);
                    this.setState({
                        data : jsonPullRequests,

                    })
                }
            );
        fetch(summaryUrl)
            .then((prSummary)=> prSummary.json())
            .then((jsonPrSummary)=>
                {
                    console.log(jsonPrSummary);
                    this.setState({
                        summary : jsonPrSummary,
                    })
                }
            )
    }

    render() {
        return(
            <div>
                <div className="summaryTable">
                        <TacoTable
                            initialSortDirection = { SortDirection.Ascending }
                            initialSortColumnId = "Product"
                            columns = { summaryColoumn }
                            data = { this.state.summary }
                            striped
                        />
                </div>

                <BootstrapTable
                    data = { this.state.data }
                    striped = { true }
                    bordered = { false }
                    pagination search = { true }
                    options = { options }
                >
                    <TableHeaderColumn
                        width = '20%'
                        dataField = "product"
                        isKey = { true }
                        dataSort = { true }
                    >
                        Product
                    </TableHeaderColumn>
                    <TableHeaderColumn
                        width = '15%'
                        dataField = "RepositoryName"
                        dataSort = { true }
                    >
                        Repository
                    </TableHeaderColumn>
                    <TableHeaderColumn
                        ref = 'url'
                        width = '35%'
                        dataField = "Url"
                        dataSort = { true }
                        dataFormat={urlNavigation}
                    >
                        Url
                    </TableHeaderColumn>
                    <TableHeaderColumn
                        width = '15%'
                        dataField = "State"
                        dataSort = { true }
                    >
                        PR Status
                    </TableHeaderColumn>
                    <TableHeaderColumn
                        width = '15%'
                        dataField = "githubId"
                        dataSort = { true }
                    >
                        Github Id
                    </TableHeaderColumn>
                    <TableHeaderColumn
                        width = '10%'
                        dataField = "Days"
                        dataSort = { true }
                    >
                        Open days
                    </TableHeaderColumn>
                    <TableHeaderColumn
                        width = '10%'
                        dataField = "Weeks"
                        dataSort = { true }
                    >
                        Open Weeks
                    </TableHeaderColumn>
                </BootstrapTable>
            </div>
        )
    }
}

export default pullRequestData;
